import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase";

export async function uploadFile(data: {
  uid: string;
  name: string;
  file: FileObject;
  path: string;
}) {
  const imageRef = ref(storage, data.path);
  await uploadBytes(imageRef, data.file);
  const downloadURL = await getDownloadURL(imageRef);
  return downloadURL;
}
