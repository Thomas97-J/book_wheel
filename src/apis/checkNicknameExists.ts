import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
export async function checkNicknameExists(nickname: string) {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("nickname", "==", nickname));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
}
