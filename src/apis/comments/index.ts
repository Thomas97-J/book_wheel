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

export async function addReplyToComment(
  commentId: string,
  replyData: { content: string; userId: string }
) {
  try {
    const repliesCollection = collection(db, `comments/${commentId}/replies`);
    const docRef = await addDoc(repliesCollection, {
      ...replyData,
      createdAt: new Date(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding reply: ", error);
    throw error;
  }
}

export async function deleteReplyFromComment(
  commentId: string,
  replyId: string
) {
  try {
    console.log("delete replyId", replyId);

    const replyDocRef = doc(db, `comments/${commentId}/replies/${replyId}`);
    await deleteDoc(replyDocRef);
    console.log("Reply successfully deleted!");
  } catch (error) {
    console.error("Error deleting reply: ", error);
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
    const comments = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const repliesRef = collection(db, "comments", doc.id, "replies");
        let replyQ = query(repliesRef, orderBy("createdAt", "desc"));
        const repliesSnapshot = await getDocs(replyQ);
        const replies = repliesSnapshot.docs.map((replyDoc) => ({
          id: replyDoc.id,
          ...replyDoc.data(),
        }));
        return {
          id: doc.id,
          ...doc.data(),
          replies,
        };
      })
    );

    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    console.log("getCommentsBatchBy20", comments);

    return { comments, nextPage: lastVisible };
  } catch (err) {
    console.error("Error fetching comments: ", err);
    throw err;
  }
}

export async function deleteComment(commentId: string): Promise<void> {
  try {
    // Step 1: Delete all replies for the comment
    const repliesRef = collection(db, "comments", commentId, "replies");
    const repliesQuerySnapshot = await getDocs(repliesRef);
    const deleteRepliesPromises = repliesQuerySnapshot.docs.map(async (doc) => {
      await deleteDoc(doc.ref);
      console.log("Reply successfully deleted:", doc.id);
    });
    await Promise.all(deleteRepliesPromises);

    // Step 2: Delete the comment itself
    const commentDocRef = doc(db, "comments", commentId);
    await deleteDoc(commentDocRef);
    console.log("Comment successfully deleted!");
  } catch (error) {
    console.error("Error deleting comment and replies: ", error);
    throw error;
  }
}
