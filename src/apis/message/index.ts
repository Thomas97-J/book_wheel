import {
  addDoc,
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  increment,
  limit,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
  serverTimestamp,
  startAfter,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { getUserById } from "../users";

// Fetch messages for a specific chat
export async function fetchMessages(
  chatId: string,
  pageParam: any
): Promise<Message[]> {
  try {
    let q = query(
      collection(db, "chats", chatId, "messages"),
      orderBy("createdAt")
    );
    if (pageParam) {
      q = query(q, startAfter(pageParam));
    }
    const querySnapshot = await getDocs(q);
    const messages = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Message[];
    console.log(messages);

    return messages;
  } catch (error) {
    console.error("Error fetching messages: ", error);
    throw error;
  }
}

interface FetchMessagesParams {
  chatId: string;
  pageParam?: any;
}

export async function fetchMessagesBatch({
  chatId,
  pageParam = null,
}: FetchMessagesParams) {
  try {
    console.log(chatId, pageParam);

    let q = query(
      collection(db, "chats", chatId, "messages"),
      orderBy("createdAt", "desc"),
      limit(50)
    );

    if (pageParam) {
      q = query(q, startAfter(pageParam));
    }

    const querySnapshot = await getDocs(q);
    const messages = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Message[];

    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    console.log(
      "fetchMessagesBatch",
      messages,
      lastVisible,
      querySnapshot.docs.length - 1
    );

    return { messages, nextPage: lastVisible };
  } catch (error) {
    console.error("Error fetching messages: ", error);
    throw error;
  }
}

export async function getUserChatRooms(userId: string) {
  try {
    const chatRoomsRef = collection(db, "chats");
    const q = query(
      chatRoomsRef,
      where("users", "array-contains", userId),
      orderBy("updatedAt", "desc")
    );

    const querySnapshot = await getDocs(q);
    console.log("getUserChatRoomsquerySnapshot", querySnapshot, userId);

    const chats = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const chatData = doc.data();
        const otherUsersIds = chatData.users.filter(
          (user: string) => user !== userId
        );

        // Fetch other users' information
        const otherUsersPromises = otherUsersIds.map((uid: string) =>
          getUserById(uid)
        );
        const otherUsers = await Promise.all(otherUsersPromises);

        return {
          id: doc.id,
          ...chatData,
          otherUsers: otherUsers,
        };
      })
    );

    console.log("getUserChatRooms", chats);

    return chats;
  } catch (error) {
    console.error("Error fetching chat rooms:", error);
    throw error;
  }
}

// Add a new message to a specific chat
export async function addMessage(
  chatId: string,
  message: Message,
  receiverUserId: string
) {
  try {
    await addDoc(collection(db, "chats", chatId, "messages"), {
      ...message,
      createdAt: serverTimestamp(),
    });
    const chatDocRef = doc(db, "chats", chatId);

    await updateDoc(chatDocRef, {
      lastMessage: { ...message, createdAt: serverTimestamp() },
      updatedAt: serverTimestamp(),
      [`unreadCount.${receiverUserId}`]: increment(1),
    });
  } catch (error) {
    console.error("Error adding message: ", error);
    throw error;
  }
}

export async function createChat(
  userId1: string,
  userId2: string
): Promise<string> {
  try {
    // 채팅을 추가할 때 사용할 데이터
    const chatData = {
      users: [userId1, userId2],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      // 추가적인 필드들을 필요에 따라 여기에 추가할 수 있습니다.
    };

    // chats 컬렉션에 새로운 채팅 데이터 추가x
    const docRef = await addDoc(collection(db, "chats"), chatData);
    return docRef.id; // 추가된 채팅의 ID 반환
  } catch (error) {
    console.error("Error creating chat:", error);
    throw error;
  }
}

export async function checkExistingChat(userId1: string, userId2: string) {
  try {
    const chatsRef = collection(db, "chats");
    const q = query(chatsRef, where("users", "array-contains", userId1));
    const querySnapshot = await getDocs(q);

    // 두 번째 유저가 포함된 문서만 필터링
    const matchingChat = querySnapshot.docs.find((doc) => {
      const users = doc.data().users;
      return users.includes(userId2);
    });

    if (matchingChat) {
      return matchingChat.id;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error checking existing chat: ", error);
    throw error;
  }
}

export async function getChatUsers(chatId: string): Promise<string[]> {
  try {
    // chats collection에서 해당 chatId의 문서 참조 가져오기
    const chatDocRef = doc(db, "chats", chatId);

    // chatId에 해당하는 문서 가져오기
    const chatDocSnap = await getDoc(chatDocRef);

    // chatId에 해당하는 문서가 없는 경우
    if (!chatDocSnap.exists()) {
      throw new Error(`Chat room with ID ${chatId} not found`);
    }

    // chatId에 해당하는 문서의 users 필드 리턴
    const chatData = chatDocSnap.data();
    const users: string[] = chatData.users ?? [];

    return users;
  } catch (error) {
    console.error("Error fetching chat users:", error);
    throw error;
  }
}
export function subscribeToUserChatRooms(
  userId: string,
  callback: (chats: any[]) => void
) {
  try {
    const chatRoomsRef = collection(db, "chats");
    const q = query(
      chatRoomsRef,
      where("users", "array-contains", userId),
      orderBy("updatedAt", "desc")
    );

    return onSnapshot(q, async (querySnapshot) => {
      console.log(
        "subscribeToUserChatRooms querySnapshot",
        querySnapshot,
        userId
      );

      const chats = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const chatData = doc.data();
          const otherUsersIds = chatData.users.filter(
            (user: string) => user !== userId
          );

          // Fetch other users' information
          const otherUsersPromises = otherUsersIds.map((uid: string) =>
            getUserById(uid)
          );
          const otherUsers = await Promise.all(otherUsersPromises);

          return {
            id: doc.id,
            ...chatData,
            otherUsers: otherUsers,
          };
        })
      );

      console.log("subscribeToUserChatRooms", chats);

      callback(chats);
    });
  } catch (error) {
    console.error("Error subscribing to chat rooms:", error);
    throw error;
  }
}

export function subscribeToUnreadMessageCounts(
  userId: string,
  callback: (unreadCounts: Record<string, number>) => void
) {
  const q = query(
    collection(db, "chats"),
    where("users", "array-contains", userId)
  );

  return onSnapshot(q, (querySnapshot) => {
    const unreadCounts: Record<string, number> = {};

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const chatId = doc.id;
      const unreadCount = data.unreadCount?.[userId] || 0;
      unreadCounts[chatId] = unreadCount;
    });
    console.log("subscribeToUnreadMessageCounts", unreadCounts);

    callback(unreadCounts);
  });
}

export function subscribeToMessages(
  chatId: string,
  callback: (messages: Message[]) => void
) {
  const q = query(
    collection(db, "chats", chatId, "messages"),
    orderBy("createdAt")
  );

  return onSnapshot(q, (querySnapshot: QuerySnapshot<DocumentData>) => {
    const messages = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Message[];

    callback(messages);
  });
}

export async function resetUnreadCount(chatId: string, userId: string) {
  try {
    const chatDocRef = doc(db, "chats", chatId);
    console.log(chatId, userId);

    await updateDoc(chatDocRef, {
      [`unreadCount.${userId}`]: 0,
    });

    console.log(`Unread count for ${userId} in chat ${chatId} reset to 0.`);
  } catch (error) {
    console.error("Error resetting unread count:", error);
    throw error;
  }
}
