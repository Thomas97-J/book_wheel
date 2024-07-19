import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";

// Create
export const createDeal = async ({
  fromUid,
  fromNickname,
  toUid,
  toNickname,
  bookIndex,
  bookName,
}: {
  fromUid: string;
  fromNickname: string;
  toUid: string;
  toNickname: string;
  bookIndex: number;
  bookName: string;
}): Promise<string | undefined> => {
  try {
    const dealsCollection = collection(db, "deals");

    const dealRef = await addDoc(dealsCollection, {
      from_uid: fromUid,
      from_nickname: fromNickname,
      to_uid: toUid,
      to_nickname: toNickname,
      book_index: bookIndex,
      book_name: bookName,
      state: "await",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return dealRef.id;
  } catch (error) {
    console.error("Error creating deal: ", error);
    throw error;
  }
};

// Read all
export const getAllDeals = async (): Promise<Deal[]> => {
  try {
    const dealsCollection = collection(db, "deals");

    const dealSnapshot = await getDocs(dealsCollection);
    const dealList = dealSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as Deal[];
    return dealList;
  } catch (error) {
    console.error("Error getting all deals: ", error);
    throw error;
  }
};

export async function getDealsByToUserUid(uid: string): Promise<Deal[]> {
  try {
    const dealsCollection = collection(db, "deals");
    const dealsQuery = query(dealsCollection, where("to_uid", "==", uid));
    const dealSnapshot = await getDocs(dealsQuery);
    const dealList = dealSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as Deal[];
    return dealList;
  } catch (error) {
    console.error("Error getting user from deals: ", error);
    throw error;
  }
}

export async function getDealsByFromUserUid(uid: string): Promise<Deal[]> {
  try {
    const dealsCollection = collection(db, "deals");
    const dealsQuery = query(dealsCollection, where("from_uid", "==", uid));
    const dealSnapshot = await getDocs(dealsQuery);
    const dealList = dealSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as Deal[];
    return dealList;
  } catch (error) {
    console.error("Error getting user from deals: ", error);
    throw error;
  }
}
// Read one
export const getDealById = async (id: string): Promise<Deal | undefined> => {
  try {
    const dealDoc = doc(db, "deals", id);
    const deal = await getDoc(dealDoc);
    if (deal.exists()) {
      return { ...deal.data(), id: deal.id } as Deal;
    }
    return undefined;
  } catch (error) {
    console.error("Error getting deal by ID: ", error);
    throw error;
  }
};

// Update
export const updateDeal = async (
  id: string,
  updatedDeal: Partial<Deal>
): Promise<void> => {
  try {
    const dealDoc = doc(db, "deals", id);
    await updateDoc(dealDoc, {
      ...updatedDeal,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating deal: ", error);
    throw error;
  }
};

// Delete
export const deleteDeal = async (id: string): Promise<void> => {
  try {
    const dealDoc = doc(db, "deals", id);
    await deleteDoc(dealDoc);
  } catch (error) {
    console.error("Error deleting deal: ", error);
    throw error;
  }
};
