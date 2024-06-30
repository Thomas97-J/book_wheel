import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { storage } from "../../firebase";

export async function uploadFile(data: { file: FileObject; path: string }) {
  const imageRef = ref(storage, data.path);
  await uploadBytes(imageRef, data.file);
  const downloadURL = await getDownloadURL(imageRef);
  return downloadURL;
}

export async function deleteFile(downloadURL: string) {
  const imageRef = ref(storage, downloadURL);

  try {
    await deleteObject(imageRef);
    console.log("File deleted successfully");
  } catch (error) {
    console.error("Error deleting file:", error);
  }
}
