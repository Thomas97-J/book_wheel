import { useState, useRef } from "react";

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
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      setValue("photoFile", file); // Update react-hook-form value
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
