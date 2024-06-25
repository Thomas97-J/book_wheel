import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore";
import { db, auth } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { EmailAuthProvider } from "firebase/auth/web-extension";

export async function signUp(data: {
  nickname: string;
  email: string;
  password: string;
  password_conform: string;
  tel: string;
}) {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    data.email,
    data.password
  );
  const user = userCredential.user;
  await updateProfile(user, {
    displayName: data.nickname,
  });
  await setDoc(doc(db, "users", user.uid), {
    tel: data.tel,
    nickname: data.nickname,
  });
}

export async function signIn(data: { email: string; password: string }) {
  return signInWithEmailAndPassword(auth, data.email, data.password);
}

export async function reauthenticate(data: { password: string }) {
  try {
    if (!auth.currentUser?.email) return false;
    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      data.password
    );

    await reauthenticateWithCredential(auth.currentUser, credential);
  } catch (error) {
    console.error("reauthenticate false");
    throw error;
  }
}
export async function passwordUpdate(newPassword: string) {
  if (auth.currentUser) {
    await updatePassword(auth.currentUser, newPassword);
  }
}
export async function checkNicknameExists(nickname: string) {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("nickname", "==", nickname));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
}
