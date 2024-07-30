import {
  FieldValue,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
  startAfter,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { deleteFile } from "../firestore";

export async function getBooksBatch({
  pageParam = null,
  filter = {},
  areaNo = 0,
  batchSize,
}: {
  areaNo: number;
  pageParam?: any;
  batchSize?: number;
  filter?: {
    uid?: string;
    title?: string;
    category?: string;
    author?: string;
    genres?: string[];
    keyword?: string;
    owner?: boolean;
    indexes?: number[];
  };
}) {
  try {
    const booksRef = collection(db, "books");
    let q = query(
      booksRef,
      orderBy("createdAt", "desc"),
      where("areaNo", "==", areaNo)
    );
    if (batchSize) {
      q = query(q, limit(batchSize));
    }
    console.log("filter", filter);

    if (!filter.owner) {
      q = query(q, where("isPublic", "==", true));
    }
    if (filter.uid) {
      q = query(q, where("uid", "==", filter.uid));
    }
    if (filter.title) {
      q = query(q, where("title", "==", filter.title));
    }
    if (filter.author) {
      q = query(q, where("author", "==", filter.author));
    }
    if (filter.genres && filter.genres.length > 0) {
      q = query(q, where("genres", "array-contains-any", filter.genres));
    }
    if (filter.category && filter.category !== "all") {
      q = query(q, where("category", "==", filter.category));
    }
    if (filter.keyword) {
      q = query(
        q,
        where("title", ">=", filter.keyword),
        where("title", "<=", filter.keyword + "\uf8ff")
      );
      // q = query(q, where("author", "array-contains", filter.keyword));
      // q = query(q, where("publisher", "array-contains", filter.keyword));
    }
    if (filter.indexes && filter.indexes.length > 0) {
      q = query(q, where("index", "in", filter.indexes));
    }
    if (pageParam) {
      q = query(q, startAfter(pageParam));
    }
    console.log(pageParam);

    const querySnapshot = await getDocs(q);
    const count = querySnapshot.size;

    const books = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

    return { books, nextPage: lastVisible, count: count };
  } catch (err) {
    console.error(err);
    return { books: [], nextPage: undefined };
  }
}

export async function getBooksCountByUid(uid: string): Promise<number> {
  try {
    const booksRef = collection(db, "books");
    const q = query(booksRef, where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    const count = querySnapshot.size;
    console.log(`Number of books for uid ${uid}: ${count}`);
    return count;
  } catch (error) {
    console.error("Error fetching books count: ", error);
    throw error;
  }
}

export async function getBookById(bookId: string): Promise<Book> {
  const bookDoc = doc(db, "books", bookId);
  const bookSnapshot = await getDoc(bookDoc);

  if (!bookSnapshot.exists()) {
    throw new Error("Book not found");
  }

  return { id: bookSnapshot.id, ...bookSnapshot.data() } as Book;
}

export async function getBookByIndex(index: number): Promise<Book> {
  try {
    const booksRef = collection(db, "books");
    const bookQuery = query(booksRef, where("index", "==", index), limit(1));
    const querySnapshot = await getDocs(bookQuery);

    if (querySnapshot.empty) {
      throw new Error(`No book found with index ${index}`);
    }

    const bookDoc = querySnapshot.docs[0];
    const bookData = bookDoc.data() as Book;

    const book: Book = {
      id: bookDoc.id,
      ...bookData,
    };

    return book;
  } catch (error) {
    console.error("Error fetching book by index: ", error);
    throw error;
  }
}
interface NewBookData {
  uid: string;
  title: string;
  author: string;
  category: string;
  genres?: string[];
  content: string;
  publisher: string;
  areaNo: number;
  photoUrl?: string;
}

export async function createBookWithIndex(
  newBookData: NewBookData
): Promise<{ id: string; index: number }> {
  try {
    const bookIndex = await runTransaction(db, async (transaction) => {
      const booksRef = collection(db, "books");
      const latestBookQuery = query(
        booksRef,
        orderBy("index", "desc"),
        limit(1)
      );

      const latestBookSnapshot = await getDocs(latestBookQuery);

      let newIndex = 1;

      if (!latestBookSnapshot.empty) {
        const latestBook = latestBookSnapshot.docs[0];
        newIndex = latestBook.data().index + 1;
      }

      const newBookRef = doc(booksRef);
      const bookData = {
        uid: newBookData.uid,
        title: newBookData.title,
        author: newBookData.author,
        genres: newBookData.genres ?? [],
        content: newBookData.content,
        category: newBookData.category,
        publisher: newBookData.publisher,
        photoUrl: newBookData.photoUrl,
        areaNo: newBookData.areaNo,
        isPublic: true,
        createdAt: new Date(),
        index: newIndex,
      };
      console.log(bookData);

      transaction.set(newBookRef, bookData);
      return { id: newBookRef.id, index: newIndex };
    });

    return bookIndex;
  } catch (error) {
    console.error("Error adding book with index: ", error);
    throw error;
  }
}

export async function updateBookByIndex(bookData: Book): Promise<void> {
  const booksRef = collection(db, "books");
  const booksQuery = query(
    booksRef,
    where("index", "==", bookData.index),
    limit(1)
  );
  const querySnapshot = await getDocs(booksQuery);

  if (querySnapshot.empty) {
    throw new Error(`No book found with index ${bookData.index}`);
  }
  const updateBook: NewBookData & { updatedAt: FieldValue } = {
    uid: bookData.uid,
    title: bookData.title,
    author: bookData.author,
    genres: bookData.genres ?? [],
    content: bookData.content,
    publisher: bookData.publisher,
    category: bookData.category,
    areaNo: bookData.areaNo,
    updatedAt: serverTimestamp(),
  };
  //찾아진 첫 인덱스
  const bookDoc = querySnapshot.docs[0].ref;
  //기존 이미지 삭제
  if (
    bookData.photoUrl &&
    querySnapshot.docs[0].data()?.photoUrl !== bookData.photoUrl
  ) {
    deleteFile(querySnapshot.docs[0].data()?.photoUrl);
    updateBook.photoUrl = bookData.photoUrl;
  }
  console.log(updateBook);

  await updateDoc(bookDoc, updateBook as Record<string, any>);
}

export async function deleteBook(bookId: string) {
  try {
    const bookRef = doc(db, "books", bookId);
    const bookData = await getBookById(bookId);
    if (bookData?.photoUrl) {
      deleteFile(bookData?.photoUrl);
    }
    await deleteDoc(bookRef);
    console.log("Book successfully deleted!");
  } catch (error) {
    console.error("Error deleting book:", error);
    throw error;
  }
}

export async function getMaxBookIndex() {
  try {
    const booksRef = collection(db, "books");
    const q = query(booksRef, orderBy("index", "desc"), limit(1));

    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const maxIndexBook = querySnapshot.docs[0].data();
      return maxIndexBook.index;
    } else {
      console.log("No books found.");
      return null;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
}

interface GetBooksResponse {
  books: any[];
  nextPageToken: any;
}

export async function getBooksBatchBy3(
  pageToken?: any
): Promise<GetBooksResponse> {
  try {
    const booksRef = collection(db, "books");
    let q = query(
      booksRef,
      orderBy("author"),
      where("isPublic", "==", true),
      limit(3)
    );

    if (pageToken) {
      q = query(q, startAfter(pageToken));
    }

    const querySnapshot = await getDocs(q);

    const books = querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as Book)
    );
    const nextPageToken =
      querySnapshot.docs.length === 3
        ? querySnapshot.docs[querySnapshot.docs.length - 1]
        : null;

    return { books, nextPageToken };
  } catch (err) {
    console.error(err);
    return { books: [], nextPageToken: null };
  }
}

interface UpdatePublisherParams {
  bookId: string;
  newIsPublic: boolean;
}

export async function updatePublic({
  bookId,
  newIsPublic,
}: UpdatePublisherParams) {
  const bookDoc = doc(db, "books", bookId);
  await updateDoc(bookDoc, {
    isPublic: newIsPublic,
  });
}

//
//
//
// updateAllBook();
export async function updateAllBook() {
  try {
    // 모든 도서 가져오기
    const booksRef = collection(db, "books");
    const querySnapshot = await getDocs(booksRef);

    // 가져온 각 도서에에 대해 업데이트 수행
    const batchUpdates = querySnapshot.docs.map(async (docOld) => {
      const postId = docOld.id;
      const postData = docOld.data();

      // 기존 데이터에 공개 추가
      const updatedData = {
        ...postData,
        isPublic: true,
      };

      // 해당 도서 업데이트
      const postRef = doc(db, "books", postId);
      await updateDoc(postRef, updatedData);
    });

    // 모든 업데이트가 완료될 때까지 기다림
    await Promise.all(batchUpdates);

    console.log("All posts updated with areaNo successfully!");
  } catch (error) {
    console.error("Error updating posts with areaNo:", error);
    throw error;
  }
}
