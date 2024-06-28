import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";

//get

export async function getAllUsers(): Promise<UserData[]> {
  const userSnapshot = await getDocs(collection(db, "users"));
  return userSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function getUserById(uid: string) {
  const userDoc = doc(db, "users", uid);
  const userSnapshot = await getDoc(userDoc);
  return userSnapshot.data();
}

export async function getUserByNickname(nickname: string): Promise<{
  uid: string;
  profileImage?: string;
  nickname: string;
  bio?: string;
}> {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("nickname", "==", nickname));
  const querySnapshot = await getDocs(q);
  const userDoc = querySnapshot.docs[0];
  const userData = userDoc.data();
  const uid = userDoc.id;

  return {
    uid,
    profileImage: userData.profileImage,
    nickname: userData.nickname,
    bio: userData.bio,
  };
}

export async function getUsersByNickname(nickname: string) {
  const usersRef = collection(db, "users");

  const q = query(
    usersRef,
    where("nickname", ">=", nickname),
    where("nickname", "<=", nickname + "\uf8ff")
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

//update

export async function updateUserData({
  uid,
  data,
}: {
  uid: string;
  data: any;
}) {
  const userDoc = doc(db, "users", uid);
  await updateDoc(userDoc, {
    nickname: data?.nickname ?? "",
    bio: data?.bio ?? "",
    profileImage: data?.profileImage ?? "",
    updatedAt: new Date(),
  });
}

export async function createFollow(params: {
  from_userId: string;
  to_userId: string;
}) {
  try {
    const { from_userId, to_userId } = params;
    console.log(from_userId, to_userId);

    const isFollowing = await checkIsFollowing(from_userId, to_userId);
    if (isFollowing) {
      throw Error("이미 팔로잉한 사용자입니다.");
    }
    console.log("isFollowing", isFollowing);

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
