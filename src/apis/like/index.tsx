import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  setDoc,
  startAfter,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { getAuth } from "firebase/auth";

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
      createdAt: new Date(),
    });
    console.log("Post Like successfully added!");
  } catch (error) {
    console.error("Error adding post like:", error);
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

export async function getPostLikeId(
  userId: string,
  postId: string
): Promise<string | null> {
  const likeQuery = query(
    collection(db, "like_posts"),
    where("userId", "==", userId),
    where("postId", "==", postId)
  );

  const querySnapshot = await getDocs(likeQuery);
  const docSnap = querySnapshot.docs[0];
  console.log("getPostLikeId", docSnap?.id);

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

export async function getReceivedLikesCount(postId: string): Promise<number> {
  const receivedLikesQuery = query(
    collection(db, "like_posts"),
    where("postId", "==", postId)
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
