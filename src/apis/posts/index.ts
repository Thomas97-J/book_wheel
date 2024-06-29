import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  runTransaction,
  setDoc,
  startAfter,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";

export async function createPost(newPostData: {
  uid: string;
  title: string;
  content: string;
  category?: string;
}) {
  const docRef = await addDoc(collection(db, "posts"), {
    uid: newPostData.uid,
    title: newPostData.title,
    content: newPostData.content,
    createdAt: new Date(),
  });
  return docRef.id;
}

//파이어베이스의 id를 실제 포스트의 쿼리로 사용하기에는 너무 길고 복잡
//보통은 백엔드에서 index를 잡아주지만 현재 백엔드가 없는 문제로
//프론트에서 index를 관리하기로 결정. 동시성 문제가 발생할 수 있으므로
//트랜젝션을 사용해 관리하도록 함
export async function createPostWithIndex(newPostData: {
  uid: string;
  title: string;
  content: string;
  category?: string;
}) {
  try {
    const postIndex = await runTransaction(db, async (transaction) => {
      const postsRef = collection(db, "posts");
      const latestPostQuery = query(
        postsRef,
        orderBy("index", "desc"),
        limit(1)
      );

      const latestPostSnapshot = await getDocs(latestPostQuery);

      let newIndex = 1; // 시작 인덱스

      if (!latestPostSnapshot.empty) {
        const latestPost = latestPostSnapshot.docs[0];
        newIndex = latestPost.data().index + 1;
      }

      const newPostRef = doc(postsRef);
      transaction.set(newPostRef, {
        uid: newPostData.uid,
        title: newPostData.title,
        content: newPostData.content,
        category: newPostData.category,
        createdAt: new Date(),
        index: newIndex,
      });
      return newIndex;
    });

    return postIndex;
  } catch (error) {
    console.error("Error adding post with index: ", error);
    throw error;
  }
}

export async function updatePost(newPostData: {
  uid: string;
  postId: string;
  title: string;
  content: string;
  category?: string;
}) {
  const postDoc = doc(db, "posts", newPostData.postId);

  await updateDoc(postDoc, {
    uid: newPostData.uid,
    title: newPostData.title,
    content: newPostData.content,
    updatedAt: new Date(),
  });
}

export async function updatePostByIndex(newPostData: {
  uid: string;
  index: number;
  title: string;
  content: string;
  category?: string;
}) {
  try {
    //인덱스 찾기
    const postsRef = collection(db, "posts");
    const postQuery = query(postsRef, where("index", "==", newPostData.index));
    const querySnapshot = await getDocs(postQuery);

    if (querySnapshot.empty) {
      throw new Error(`No post found with index ${newPostData.index}`);
    }
    //찾아진 첫 인덱스
    const postDoc = querySnapshot.docs[0].ref;

    await updateDoc(postDoc, {
      uid: newPostData.uid,
      title: newPostData.title,
      content: newPostData.content,
      category: newPostData.category,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error("Error updating post by index: ", error);
    throw error;
  }
}

export async function getAllPosts(): Promise<Post[]> {
  try {
    const querySnapshot = await getDocs(collection(db, "posts"));
    const posts: Post[] = querySnapshot.docs.map((doc): Post => {
      const data = doc.data() as Post;
      return {
        id: doc.id,
        title: data.title,
        content: data.content,
        index: data.index,
        uid: data.uid,
        createdAt: data.createdAt,
      };
    });
    return posts;
  } catch (error) {
    console.error("Error fetching posts: ", error);
    throw error;
  }
}

export async function getUserPosts(userId: string) {
  try {
    const postsQuery = query(
      collection(db, "posts"),
      where("uid", "==", userId)
    );
    const querySnapshot = await getDocs(postsQuery);
    const posts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return posts;
  } catch (error) {
    console.error("Error fetching user posts: ", error);
    throw error;
  }
}

export async function getPostsBatchBy10({
  pageParam = null,
  category = "all",
}: {
  pageParam?: any;
  category?: string;
}) {
  try {
    const postsRef = collection(db, "posts");
    let q = query(postsRef, orderBy("createdAt", "desc"), limit(10));
    console.log("getPostsBatchBy10", category);

    if (!category || category == "all") {
      if (pageParam) {
        q = query(
          postsRef,
          orderBy("createdAt", "desc"),
          startAfter(pageParam),
          limit(10)
        );
      } else {
        q = query(postsRef, orderBy("createdAt", "desc"), limit(10));
      }
    } else {
      if (pageParam) {
        q = query(
          postsRef,
          where("category", "==", category),
          orderBy("createdAt", "desc"),
          startAfter(pageParam),
          limit(10)
        );
      } else {
        q = query(
          postsRef,
          where("category", "==", category),
          orderBy("createdAt", "desc"),
          limit(10)
        );
      }
    }

    const querySnapshot = await getDocs(q);
    const posts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log(posts);

    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

    return { posts, nextPage: lastVisible };
  } catch (err) {
    console.log(err);
  }
}

export async function getPostById(postId: string): Promise<Post> {
  try {
    const postDoc = doc(db, "posts", postId);
    const postSnapshot = await getDoc(postDoc);
    const data = postSnapshot.data();
    console.log("getPostById", data);

    return data as Post;
  } catch (error) {
    console.error("Error fetching user posts: ", error);
    throw error;
  }
}

export async function getPostByIndex(index: number): Promise<Post> {
  try {
    const postsRef = collection(db, "posts");
    const postQuery = query(postsRef, where("index", "==", index));
    const querySnapshot = await getDocs(postQuery);

    if (querySnapshot.empty) {
      throw new Error(`No post found with index ${index}`);
    }

    const postDoc = querySnapshot.docs[0];
    const postData = postDoc.data() as Post;

    const post: Post = {
      id: postDoc.id,
      ...postData,
    };

    return post;
  } catch (error) {
    console.error("Error fetching post by index: ", error);
    throw error;
  }
}

export async function deletePost(postId: string) {
  try {
    const postRef = doc(db, "posts", postId);
    await deleteDoc(postRef);
    console.log("Post successfully deleted!");
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
}

export async function getFollowCount(uid: string): Promise<{
  followingCount: number;
  followersCount: number;
}> {
  // from_userId가 uid인 문서의 수를 세어 팔로우하는 수를 구합니다.
  const followingQuery = query(
    collection(db, "follows"),
    where("from_userId", "==", uid)
  );
  const followingSnapshot = await getDocs(followingQuery);
  const followingCount = followingSnapshot.size;

  // to_userId가 uid인 문서의 수를 세어 팔로우 받는 수를 구합니다.
  const followersQuery = query(
    collection(db, "follows"),
    where("to_userId", "==", uid)
  );
  const followersSnapshot = await getDocs(followersQuery);
  const followersCount = followersSnapshot.size;

  // 팔로우하는 수와 팔로우 받는 수를 반환합니다.
  return { followingCount, followersCount };
}
