import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";

export async function getAllUsers(): Promise<UserData[]> {
  const userSnapshot = await getDocs(collection(db, "users"));
  return userSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}
export async function getUserById(uid: string) {
  const userDoc = doc(db, "users", uid);
  const userSnapshot = await getDoc(userDoc);
  return userSnapshot.data();
}

export async function getUserByNickname(nickname: string) {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("nickname", "==", nickname));
  const querySnapshot = await getDocs(q);
  const user = querySnapshot.docs[0].data();
  return user;
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
  });
}
