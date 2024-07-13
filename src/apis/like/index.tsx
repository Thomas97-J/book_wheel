import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  serverTimestamp,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";

export async function createPostLike(params: {
  userId: string;
  postId: string;
}): Promise<void> {
  try {
    const { userId, postId } = params;

    // Check if the like already exists
    const isLiked = await getPostLikeId(userId, postId);
    console.log("isLiked", isLiked);

    if (isLiked) {
      throw Error("이미 좋아요를 누른 게시물입니다.");
    }

    // Add new like entry
    await addDoc(collection(db, "like_posts"), {
      userId: userId,
      postId: postId,
      createdAt: serverTimestamp(),
    });
    console.log("Post Like successfully added!");
  } catch (error) {
    console.error("Error adding post like:", error);
    throw error;
  }
}

export async function createCommentLike(params: {
  userId: string;
  commentId: string;
}): Promise<void> {
  try {
    const { userId, commentId } = params;

    // Check if the like already exists
    const isLiked = await getCommentLikeId(userId, commentId);
    console.log("isLiked", isLiked);

    if (isLiked) {
      throw Error("이미 좋아요를 누른 댓글입니다.");
    }

    // Add new like entry
    await addDoc(collection(db, "like_comments"), {
      userId: userId,
      commentId: commentId,
      createdAt: serverTimestamp(),
    });
    console.log("Comment Like successfully added!");
  } catch (error) {
    console.error("Error adding Comment like:", error);
    throw error;
  }
}
export async function createBookLike(params: {
  userId: string;
  bookId: string;
}): Promise<void> {
  try {
    const { userId, bookId } = params;

    // Check if the like already exists
    const isLiked = await getBookLikeId(userId, bookId);
    console.log("isLiked", isLiked);

    if (isLiked) {
      throw Error("이미 좋아요를 누른 도서입니다.");
    }

    // Add new like entry
    await addDoc(collection(db, "like_books"), {
      userId: userId,
      bookId: bookId,
      createdAt: serverTimestamp(),
    });
    console.log("Book Like successfully added!");
  } catch (error) {
    console.error("Error adding books like:", error);
    throw error;
  }
}

export async function deletePostLike(likeId: string): Promise<void> {
  try {
    const likeRef = doc(db, "like_posts", likeId);
    await deleteDoc(likeRef);
    console.log("Post Like successfully deleted!");
  } catch (error) {
    console.error("Error deleting post like:", error);
    throw error;
  }
}

export async function deleteCommentLike(likeId: string): Promise<void> {
  try {
    const likeRef = doc(db, "like_comments", likeId);
    await deleteDoc(likeRef);
    console.log("Comment Like successfully deleted!");
  } catch (error) {
    console.error("Error deleting Comment like:", error);
    throw error;
  }
}

export async function deleteBookLike(likeId: string): Promise<void> {
  try {
    const likeRef = doc(db, "like_books", likeId);
    await deleteDoc(likeRef);
    console.log("Book Like successfully deleted!");
  } catch (error) {
    console.error("Error deleting book like:", error);
    throw error;
  }
}
export async function getPostLikeId(
  userId: string,
  postId: string
): Promise<string | null> {
  const likeQuery = query(
    collection(db, "like_posts"),
    where("userId", "==", userId),
    where("postId", "==", postId),
    limit(1)
  );

  const querySnapshot = await getDocs(likeQuery);
  const docSnap = querySnapshot.docs[0];
  console.log("getPostLikeId", docSnap?.id);

  return docSnap?.id || "";
}
export async function getCommentLikeId(
  userId: string,
  commentId: string
): Promise<string | null> {
  const likeQuery = query(
    collection(db, "like_comments"),
    where("userId", "==", userId),
    where("commentId", "==", commentId),
    limit(1)
  );

  const querySnapshot = await getDocs(likeQuery);
  const docSnap = querySnapshot.docs[0];

  return docSnap?.id || "";
}

export async function getBookLikeId(
  userId: string,
  bookId: string
): Promise<string | null> {
  const likeQuery = query(
    collection(db, "like_books"),
    where("userId", "==", userId),
    where("bookId", "==", bookId),
    limit(1)
  );

  const querySnapshot = await getDocs(likeQuery);
  const docSnap = querySnapshot.docs[0];

  return docSnap?.id || "";
}

export async function getLikedPostsBatchBy10({
  pageParam = null,
  userId,
}: {
  pageParam?: any;
  userId: string;
}) {
  let likedPostsQuery = query(
    collection(db, "like_posts"),
    where("userId", "==", userId),
    limit(10)
  );

  if (pageParam) {
    likedPostsQuery = query(likedPostsQuery, startAfter(pageParam));
  }

  const likedPostsSnapshot = await getDocs(likedPostsQuery);
  const postIds = likedPostsSnapshot.docs.map((doc) => doc.data().postId);

  const postQuery = query(
    collection(db, "posts"),
    where("__name__", "in", postIds),
    limit(10)
  );
  const postSnapshot = await getDocs(postQuery);
  const likedPostsData = postSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  console.log("likedPostsData", likedPostsData);

  const lastVisible =
    likedPostsSnapshot.docs[likedPostsSnapshot.docs.length - 1];

  return { likedPostsData, nextPage: lastVisible };
}

export async function getLikedBooksBatchBy10({
  pageParam = null,
  userId,
}: {
  pageParam?: any;
  userId: string;
}) {
  let likedBooksQuery = query(
    collection(db, "like_books"),
    where("userId", "==", userId),
    limit(10)
  );

  if (pageParam) {
    likedBooksQuery = query(likedBooksQuery, startAfter(pageParam));
  }

  const likedBooksSnapshot = await getDocs(likedBooksQuery);
  const bookIds = likedBooksSnapshot.docs.map((doc) => doc.data().bookId);

  const bookQuery = query(
    collection(db, "books"),
    where("__name__", "in", bookIds),
    limit(10)
  );
  const bookSnapshot = await getDocs(bookQuery);
  const likedBooksData = bookSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  console.log("likedBooksData", likedBooksData);

  const lastVisible =
    likedBooksSnapshot.docs[likedBooksSnapshot.docs.length - 1];

  return { likedBooksData, nextPage: lastVisible };
}

export async function getReceivedLikesCount(postId: string): Promise<number> {
  const receivedLikesQuery = query(
    collection(db, "like_posts"),
    where("postId", "==", postId)
  );
  const receivedLikesSnapshot = await getDocs(receivedLikesQuery);
  const receivedLikesCount = receivedLikesSnapshot.size;

  return receivedLikesCount;
}

export async function getReceivedCommentLikesCount(
  commentId: string
): Promise<number> {
  const receivedLikesQuery = query(
    collection(db, "like_comments"),
    where("commentId", "==", commentId)
  );
  const receivedLikesSnapshot = await getDocs(receivedLikesQuery);
  const receivedLikesCount = receivedLikesSnapshot.size;

  return receivedLikesCount;
}

export async function getUsersWhoLikedPost(
  postId: string
): Promise<UserData[]> {
  const usersQuery = query(
    collection(db, "like_posts"),
    where("postId", "==", postId)
  );

  const usersSnapshot = await getDocs(usersQuery);
  const userIds = usersSnapshot.docs.map((doc) => doc.data().userId);

  const usersData: UserData[] = [];
  for (const userId of userIds) {
    const userDoc = await getDoc(doc(db, "users", userId));
    if (userDoc.exists()) {
      usersData.push({ id: userDoc.id, ...userDoc.data() } as UserData);
    }
  }

  return usersData;
}
