import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useNavigate, useSearchParams } from "react-router-dom";
import DropDownSelect from "../../../components/common/DropDownSelect";
import { useAuth } from "../../../context/AuthContext";
import { useUploadImgFile } from "../../../hooks/firestore/useUploadImgFile";
import PageWrapper from "../../../assets/styles/PageWrapper";
import useCreateBookWithIndex from "../../../hooks/books/useCreateBookWithIndex";
import useUpdateBookByIndex from "../../../hooks/books/useUpdateBookByIndex";
import useGetBookByIndex from "../../../hooks/books/useGetBookByIndex";
import { PATH } from "../../../App";
import { v4 as uuidv4 } from "uuid";
import DefaultHeader from "../../../components/mobile/headers/DefaultHeader";
import ImgCropRectangle from "../../../components/common/ImgCropRectangle";

interface BookForm extends Book {
  photoFile: any;
}

function BookEdit() {
  const { currentUser } = useAuth();
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<BookForm>({
    mode: "onBlur",
  });
  const [query, setQuery] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("");

  const bookIndex = parseInt(query.get("no") ?? "");
  const { bookData, isLoading } = useGetBookByIndex(bookIndex);
  const createMutation = useCreateBookWithIndex();
  const updateMutation = useUpdateBookByIndex();

  const imgPreviewRef = useRef<HTMLImageElement | null>(null);
  const { uploadImgFile, isUploading } = useUploadImgFile({
    maxSizeMB: 1,
    maxWidthOrHeight: 512,
  });
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  function saveCroppedImage(blob: Blob | null, url: string | null) {
    setImagePreview(url);
    setValue("photoFile", blob);
  }
  const options = [
    { label: "소설", value: "novel" },
    { label: "시/에세이", value: "poetry_essay" },
    { label: "인문", value: "humanities" },
    { label: "교재", value: "textbook" },
    { label: "만화", value: "comic" },
    { label: "자기개발", value: "self_development" },
    { label: "어린이", value: "children" },
    { label: "취미", value: "hobby" },
  ];

  useEffect(() => {
    if (bookData) {
      setValue("title", bookData.title);
      setValue("author", bookData.author);
      setValue("genres", bookData.genres);
      setValue("content", bookData.content);
      setValue("category", bookData.category);
      setSelectedCategory(
        options.find((option) => option.value === bookData?.category)?.label ??
          ""
      );

      if (bookData.photoUrl) {
        setImagePreview(bookData.photoUrl);
      }
    }
  }, [bookData]);

  const handleSelect = (option: { label: string; value: string }) => {
    setValue("category", option.value);
    setSelectedCategory(option.label);
    clearErrors("category");
  };

  async function onSubmit(data: BookForm) {
    try {
      const updatedBookData = {
        uid: currentUser?.uid ?? "",
        category: data.category,
        title: data.title,
        author: data.author,
        publisher: data.publisher,
        content: data.content,
        areaNo: 1,
      } as Book;
      if (!data.category) {
        setError("category", { message: "카테고리를 선택하세요." });
        return;
      }
      if (data.photoFile) {
        const downloadURL = await uploadImgFile(
          data.photoFile,
          `/books/${currentUser?.uid}/${uuidv4()}`
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

  useEffect(() => {
    console.log("imagePreview", imagePreview);
  }, [imagePreview]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <BookEditWrapper>
      <DefaultHeader />
      <BookForm onSubmit={handleSubmit(onSubmit)}>
        <DropDownSelect
          options={options}
          onSelect={handleSelect}
          placeholder="카테고리를 선택하세요"
          defaultLabel={selectedCategory}
        />
        {errors.category && (
          <ErrorMessage>{errors.category.message}</ErrorMessage>
        )}

        {imagePreview && (
          <ImagePreview src={imagePreview} ref={imgPreviewRef} alt="Preview" />
        )}
        <ImgCropRectangle saveCroppedImage={saveCroppedImage}>
          {imagePreview ? "이미지 수정" : "이미지 추가"}
        </ImgCropRectangle>

        <Title
          {...register("title", { required: "Title is required" })}
          type="text"
          placeholder="도서 제목을 입력하세요."
        />
        {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
        <Author
          {...register("author", { required: "Author is required" })}
          type="text"
          placeholder="지은이를 입력하세요."
        />
        {errors.author && <ErrorMessage>{errors.author.message}</ErrorMessage>}
        <Publisher
          {...register("publisher", { required: "publisher is required" })}
          type="text"
          placeholder="출판사를 입력하세요."
        />
        {errors.publisher && (
          <ErrorMessage>{errors.publisher.message}</ErrorMessage>
        )}

        <ContentArea
          {...register("content")}
          placeholder="도서에 대한 설명을 자유롭게 적어주세요."
        ></ContentArea>
        <SubmitButton type="submit">저장</SubmitButton>
      </BookForm>
    </BookEditWrapper>
  );
}

const BookEditWrapper = styled(PageWrapper)``;

const BookForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
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
const Publisher = styled.input`
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
  height: 100%;

  object-fit: contain;
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
