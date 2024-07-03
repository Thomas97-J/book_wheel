import { db } from "../../firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
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
export async function createComment(newCommentData: {
  postId: string;
  uid: string;
  content: string;
}) {
  try {
    console.log(newCommentData);

    const docRef = await addDoc(collection(db, "comments"), {
      postId: newCommentData.postId,
      uid: newCommentData.uid,
      content: newCommentData.content,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding comment: ", error);
    throw error;
  }
}

export async function getCommentsBatchBy20({
  pageParam = null,
  postId = "",
}: {
  pageParam?: any;
  postId?: string;
}) {
  try {
    const commentsRef = collection(db, "comments");
    let q = query(commentsRef, orderBy("createdAt", "desc"), limit(20));

    if (postId) {
      q = query(q, where("postId", "==", postId));
    }
    if (pageParam) {
      q = query(q, startAfter(pageParam));
    }

    const querySnapshot = await getDocs(q);
    const comments = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

    return { comments, nextPage: lastVisible };
  } catch (err) {
    console.error("Error fetching comments: ", err);
    throw err;
  }
}

export async function deleteComment(commentId: string): Promise<void> {
  try {
    const commentDocRef = doc(db, "comments", commentId);
    await deleteDoc(commentDocRef);
    console.log("Comment successfully deleted!");
  } catch (error) {
    console.error("Error deleting comment: ", error);
    throw error;
  }
}
