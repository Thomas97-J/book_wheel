import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { db, auth } from "../../firebase";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  signInWithPopup,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { EmailAuthProvider } from "firebase/auth/web-extension";

// create

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
    createdAt: new Date(),
  });
}

//read

export async function signIn(data: { email: string; password: string }) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    console.log("User successfully signed in:", userCredential);
    return userCredential;
  } catch (error: any) {
    let errorMessage = "Failed to sign in.";
    if (error.code) {
      switch (error.code) {
        case "auth/invalid-email":
          errorMessage = "The email address is badly formatted.";
          break;
        case "auth/user-disabled":
          errorMessage =
            "The user corresponding to the given email has been disabled.";
          break;
        case "auth/user-not-found":
          errorMessage = "There is no user corresponding to the given email.";
          break;
        case "auth/wrong-password":
          errorMessage = "The password is invalid for the given email.";
          break;
        default:
          errorMessage = error.message;
          break;
      }
    }
    console.error("Error signing in:", errorMessage);
    throw new Error(errorMessage);
  }
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
export async function checkNicknameExists(nickname: string) {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("nickname", "==", nickname));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
}
export async function handleGoogleLogin() {
  const provider = new GoogleAuthProvider(); // provider 구글 설정
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Firestore에서 해당 유저의 문서가 있는지 확인
    const userDocRef = doc(db, "users", user.uid);
    const userDocSnap = await getDoc(userDocRef);

    // 문서가 없으면 새로 생성
    if (!userDocSnap.exists()) {
      await setDoc(userDocRef, {
        uid: user.uid,
        nickname: user.displayName,
        createdAt: new Date(),
      });
      console.log("New user document created");
    } else {
      console.log("User document already exists");
    }
  } catch (err) {
    console.error("Error during Google login", err);
  }
}

//update

export async function passwordUpdate(newPassword: string) {
  if (auth.currentUser) {
    await updatePassword(auth.currentUser, newPassword);
  }
}
