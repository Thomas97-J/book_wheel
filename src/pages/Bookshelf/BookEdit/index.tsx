import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useNavigate, useSearchParams } from "react-router-dom";
import DropDownSelect from "../../../components/common/DropDownSelect";
import { useAuth } from "../../../context/AuthContext";
import useImageUpload from "../../../hooks/common/useImageUpload";
import { useUploadImgFile } from "../../../hooks/firestore/useUploadImgFile";
import PageWrapper from "../../../assets/styles/PageWrapper";
import useCreateBookWithIndex from "../../../hooks/books/useCreateBookWithIndex";
import useUpdateBookByIndex from "../../../hooks/books/useUpdateBookByIndex";
import useGetBookByIndex from "../../../hooks/books/useGetBookByIndex";
import { PATH } from "../../../App";

interface BookForm extends Book {
  photoFile: any;
}

function BookEdit() {
  const { currentUser } = useAuth();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BookForm>({
    mode: "onBlur",
  });
  const [query, setQuery] = useSearchParams();
  const bookIndex = parseInt(query.get("no") ?? "");
  const { bookData, isLoading } = useGetBookByIndex(bookIndex);
  const createMutation = useCreateBookWithIndex();
  const updateMutation = useUpdateBookByIndex();
  const { imagePreview, setImagePreview, imgRef, saveImgFile } =
    useImageUpload(setValue);
  const { uploadImgFile, isUploading } = useUploadImgFile({
    maxSizeMB: 1,
    maxWidthOrHeight: 512,
  });
  const navigate = useNavigate();
  const options = [
    { label: "Fiction", value: "fiction" },
    { label: "Non-fiction", value: "non-fiction" },
    { label: "Sci-fi", value: "sci-fi" },
    { label: "Fantasy", value: "fantasy" },
  ];

  useEffect(() => {
    if (bookData) {
      setValue("title", bookData.title);
      setValue("author", bookData.author);
      setValue("genres", bookData.genres);
      setValue("content", bookData.content);
      if (bookData.photoUrl) {
        setImagePreview(bookData.photoUrl);
      }
    }
  }, [bookData, setValue]);

  const handleSelect = (option) => {
    setValue("genres", option.value);
  };

  async function onSubmit(data: BookForm) {
    try {
      const updatedBookData = {
        uid: currentUser?.uid ?? "",
        title: data.title,
        author: data.author,
        genres: data.genres,
        content: data.content,
        areaNo: 1,
      } as Book;
      if (data.photoFile) {
        const downloadURL = await uploadImgFile(
          data.photoFile,
          `/books/${currentUser?.uid}_${new Date()}`
        );
        updatedBookData.photoUrl = downloadURL;
      }

      const isFixBook = !!bookIndex;
      if (isFixBook) {
        updatedBookData.index = bookIndex;
        await updateMutation.mutateAsync(updatedBookData);
        navigate(`${PATH.bookDetail}?no=${bookIndex}`);
      } else {
        const { index: newBookIndex } = await createMutation.mutateAsync(
          updatedBookData
        );
        navigate(`${PATH.bookDetail}?no=${newBookIndex}`);
      }
    } catch (error) {
      console.error(error);
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <BookEditWrapper>
      <BookForm onSubmit={handleSubmit(onSubmit)}>
        <DropDownSelect
          options={options}
          onSelect={handleSelect}
          placeholder="Select Genre"
        />
        {imagePreview && <ImagePreview src={imagePreview} alt="Preview" />}
        <Title
          {...register("title", { required: "Title is required" })}
          type="text"
          placeholder="Enter book title"
        />
        {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
        <Author
          {...register("author", { required: "Author is required" })}
          type="text"
          placeholder="Enter book author"
        />
        {errors.author && <ErrorMessage>{errors.author.message}</ErrorMessage>}
        <input
          type="file"
          accept="image/*"
          {...register("photoFile")}
          onChange={saveImgFile}
          ref={imgRef}
        />
        <ContentArea
          {...register("content")}
          placeholder="Enter book content"
        ></ContentArea>
        <SubmitButton type="submit">Save</SubmitButton>
      </BookForm>
    </BookEditWrapper>
  );
}

const BookEditWrapper = styled(PageWrapper)``;

const BookForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const Title = styled.input`
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 8px;
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const Author = styled.input`
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 8px;
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const ImagePreview = styled.img`
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  margin-bottom: 10px;
`;

const ContentArea = styled.textarea`
  min-height: 200px;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 8px;
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const SubmitButton = styled.button`
  padding: 10px;
  font-size: 16px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
`;

export default BookEdit;
