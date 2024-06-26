import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";

export async function createPost(newPostData: {
  uid: string;
  title: string;
  content: string;
}) {
  await addDoc(collection(db, "posts"), {
    uid: newPostData.uid,
    title: newPostData.title,
    content: newPostData.content,
    createdAt: new Date(),
  });
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
