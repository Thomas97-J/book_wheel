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

export async function createFollow(params: {
  from_userId: string;
  to_userId: string;
}) {
  try {
    const { from_userId, to_userId } = params;

    const isFollowing = await checkIsFollowing(from_userId, to_userId);
    if (isFollowing) {
      throw Error("이미 팔로잉한 사용자입니다.");
    }

    const docRef = await addDoc(collection(db, "follows"), {
      from_userId: from_userId,
      to_userId: to_userId,
      createdAt: new Date(),
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function deleteFollow(followId: string) {
  try {
    const followRef = doc(db, "follows", followId);
    await deleteDoc(followRef);
    console.log("Follow successfully deleted!");
  } catch (error) {
    console.error("Error deleting follow:", error);
    throw error;
  }
}

export async function checkIsFollowing(
  from_userId: string,
  to_userId: string
): Promise<string> {
  const followsRef = collection(db, "follows");
  const q = query(
    followsRef,
    where("from_userId", "==", from_userId),
    where("to_userId", "==", to_userId)
  );

  const querySnapshot = await getDocs(q);

  const docSnap = querySnapshot.docs[0];

  return docSnap?.id || "";
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

export async function getUserFollowers(uid: string): Promise<UserData[]> {
  const followersQuery = query(
    collection(db, "follows"),
    where("to_userId", "==", uid)
  );
  const followersSnapshot = await getDocs(followersQuery);
  const followerIds = followersSnapshot.docs.map(
    (doc) => doc.data().from_userId
  );

  const followersData: UserData[] = [];
  for (const followerId of followerIds) {
    const userDoc = await getDoc(doc(db, "users", followerId));
    if (userDoc.exists()) {
      followersData.push({ id: userDoc.id, ...userDoc.data() } as UserData);
    }
  }

  return followersData;
}

// 특정 사용자의 팔로잉 목록을 가져오는 함수
export async function getUserFollowing(uid: string): Promise<UserData[]> {
  const followingQuery = query(
    collection(db, "follows"),
    where("from_userId", "==", uid)
  );
  const followingSnapshot = await getDocs(followingQuery);
  const followingIds = followingSnapshot.docs.map(
    (doc) => doc.data().to_userId
  );

  const followingData: UserData[] = [];
  for (const followingId of followingIds) {
    const userDoc = await getDoc(doc(db, "users", followingId));
    if (userDoc.exists()) {
      followingData.push({ id: userDoc.id, ...userDoc.data() } as UserData);
    }
  }

  return followingData;
}
