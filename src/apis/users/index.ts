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

//get

export async function getAllUsers(): Promise<UserData[]> {
  const userSnapshot = await getDocs(collection(db, "users"));
  return userSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function getUsersBatchBy10({
  pageParam = null,
}: {
  pageParam?: any;
}) {
  try {
    const auth = getAuth();
    const currentUserUID = auth.currentUser?.uid;

    if (!currentUserUID) {
      throw new Error("User is not authenticated");
    }

    const usersRef = collection(db, "users");

    // Firestore에서 'uid'가 currentUserUID와 다른 문서를 가져오도록 쿼리 생성
    let q = query(
      usersRef,
      where("__name__", "!=", currentUserUID), // '!=' 연산자 사용
      limit(10)
    );

    if (pageParam) {
      q = query(
        usersRef,
        where("__name__", "!=", currentUserUID), // '!=' 연산자 사용
        startAfter(pageParam),
        limit(10)
      );
    }

    const querySnapshot = await getDocs(q);
    const users = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

    return { users, nextPage: lastVisible };
  } catch (err) {
    console.error("Error fetching users:", err);
    return { users: [], nextPage: null }; // 오류 발생 시 빈 배열과 null 반환
  }
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

export async function getUsersByNicknameBatchBy10({
  nickname,
  pageParam = null,
}: {
  nickname: string;
  pageParam?: any;
}) {
  try {
    const usersRef = collection(db, "users");

    let q = query(
      usersRef,
      where("nickname", ">=", nickname),
      where("nickname", "<=", nickname + "\uf8ff"),
      limit(10)
    );

    if (pageParam) {
      q = query(
        usersRef,
        where("nickname", ">=", nickname),
        where("nickname", "<=", nickname + "\uf8ff"),
        startAfter(pageParam),
        limit(10)
      );
    }

    const querySnapshot = await getDocs(q);
    const users = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

    return { users, nextPage: lastVisible };
  } catch (err) {
    console.error("Error fetching users by nickname:", err);
    return { users: [], nextPage: null };
  }
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

export async function addNicknameToUidMapping(
  nickname: string,
  uid: string
): Promise<void> {
  await setDoc(doc(db, "nicknameToUid", nickname), { uid: uid });
}

export async function getUidByNickname(nickname: string): Promise<string> {
  try {
    const nicknameToUidRef = collection(db, "nicknameToUid");
    const docRef = doc(nicknameToUidRef, nickname);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("쿼리안돌려 찾은 docSnap", docSnap);

      return docSnap.data().uid;
    } else {
      const { uid } = await getUserByNickname(nickname);
      console.log("쿼리돌려 찾은 uid", uid);

      // addNicknameToUidMapping 완료는 기다리지 않음
      addNicknameToUidMapping(nickname, uid);
      return uid;
    }
  } catch (err) {
    console.error(err);
    return "";
  }
}
