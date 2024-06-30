import { useState } from "react";
import imageCompression from "browser-image-compression";
import useUploadFile from "./useUploadFile";

export function useUploadImgFile({
  maxSizeMB,
  maxWidthOrHeight,
}: {
  maxSizeMB: number;
  maxWidthOrHeight: number;
}) {
  const [isUploading, setIsUploading] = useState(false);
  const uploadMutation = useUploadFile();

  async function uploadImgFile(imgFile: File, path: string): Promise<string> {
    setIsUploading(true);

    try {
      const options = {
        maxSizeMB: maxSizeMB,
        maxWidthOrHeight: maxWidthOrHeight,
        useWebWorker: true,
        fileType: "image/jpeg",
      };
      const compressedFile = await imageCompression(imgFile, options); // 이미지 파일 압축

      const downloadURL = await uploadMutation.mutateAsync({
        file: compressedFile,
        path: path,
      });

      return downloadURL;
    } catch (error) {
      console.error("Failed to upload image file:", error);
      throw error;
    } finally {
      setIsUploading(false);
    }
  }

  return { uploadImgFile, isUploading };
}
