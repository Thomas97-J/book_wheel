import { useState, useRef } from "react";
import Resizer from "react-image-file-resizer";

function useImageUpload(setValue: any) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const imgRef = useRef<HTMLInputElement | null>(null);

  const saveImgFile = () => {
    if (
      imgRef.current &&
      imgRef.current.files &&
      imgRef.current.files.length > 0
    ) {
      const file = imgRef.current.files[0];

      Resizer.imageFileResizer(
        file,
        512,
        512,
        "JPEG",
        70,
        0,
        (uri) => {
          setImagePreview(uri as string);
          setValue("photoFile", uri);
        },
        "base64"
      );
    }
  };

  return {
    imagePreview,
    setImagePreview,
    imgRef,
    saveImgFile,
  };
}

export default useImageUpload;
