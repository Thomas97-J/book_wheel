import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { PATH } from "../../App";
import useCreatePostWithIndex from "../../hooks/posts/useCreatePostWithIndex";
import useUpdatePostByIndex from "../../hooks/posts/useUpdatePostByIndex";
import useGetPostByIndex from "../../hooks/posts/useGetPostByIndex";
import DropDownSelect from "../../components/common/DropDownSelect";
import PageWrapper from "../../assets/styles/PageWrapper";
import PostEditHeader from "../../components/mobile/headers/PostEditHeader";
import { useUploadImgFile } from "../../hooks/firestore/useUploadImgFile";
import useImageUpload from "../../hooks/common/useImageUpload";

interface PostValue {
  uid: string;
  title: string;
  content: string;
  category: string;
  areaNo: number;
  index?: number;
  photoFile?: any;
  postImage?: string;
}
interface PostUpdateValue {
  uid: string;
  title: string;
  content: string;
  category: string;
  areaNo: number;
  index: number;
  photoFile?: any;
  postImage?: string;
}
function NewPost() {
  const { currentUser } = useAuth();
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isValid },
  } = useForm<PostValue>({
    mode: "onBlur",
  });
  const [query, setQuery] = useSearchParams();
  const { uploadImgFile, isUploading } = useUploadImgFile({
    maxSizeMB: 1,
    maxWidthOrHeight: 512,
  });
  const postIndex = parseInt(query.get("no") ?? "");
  const { postData, isLoading, error } = useGetPostByIndex(postIndex);
  const createMutation = useCreatePostWithIndex();
  const updateMutation = useUpdatePostByIndex();
  const { imagePreview, setImagePreview, imgRef, saveImgFile } =
    useImageUpload(setValue);

  const navigate = useNavigate();
  const options = [
    { label: "도서", value: "book" },
    { label: "취미", value: "hobby" },
    { label: "전체", value: "all" },
  ];

  const handleSelect = (option: { label: string; value: string }) => {
    setValue("category", option.value);
  };

  useEffect(() => {
    if (postData && postIndex) {
      if (!currentUser || (currentUser && currentUser?.uid !== postData.uid)) {
        alert("잘못된 접근입니다.");
        navigate(-1);
      }
      setValue("title", postData.title);

      if (postData?.postImage) {
        setValue("postImage", postData.postImage);
        setImagePreview(postData.postImage);
      }
      if (postData?.content) {
        setValue("content", postData.content);
      }
    }
  }, [postData, currentUser, navigate, postIndex, setValue]);

  async function onPostSubmit(postData: PostValue) {
    try {
      const updatedPostData: PostValue = {
        uid: currentUser?.uid || "",
        title: postData.title,
        content: postData.content,
        areaNo: 1,
        category: postData.category,
      };
      if (postData?.photoFile) {
        const downloadURL = await uploadImgFile(
          postData.photoFile,
          `/posts/${currentUser?.uid}_${new Date()}`
        );
        updatedPostData.postImage = downloadURL;
      } else if (postData?.postImage) {
        updatedPostData.postImage = postData?.postImage;
      }

      const isFixPost = !!postIndex;
      if (isFixPost) {
        updatedPostData.index = postIndex;
        await updateMutation.mutateAsync(updatedPostData as PostUpdateValue);
        navigate(`${PATH.postDetail}?no=${postIndex}`);
      } else {
        const { index: newPostIndex } = await createMutation.mutateAsync(
          updatedPostData
        );
        navigate(`${PATH.postDetail}?no=${newPostIndex}`);
      }
    } catch (err) {
      console.log("err", err);
    }
  }

  return (
    <NewPostWrapper>
      <PostEditHeader />
      <PostForm id={"postForm"} onSubmit={handleSubmit(onPostSubmit)}>
        <DropDownSelect
          options={options}
          onSelect={handleSelect}
          placeholder="전체"
        />
        {imagePreview && <ImagePreview src={imagePreview} alt="Preview" />}

        <Title
          {...register("title", {
            required: true,
            minLength: {
              value: 1,
              message: "제목을 입력해 주세요.",
            },
          })}
          type="text"
          placeholder="제목을 입력하세요."
        />

        <input
          type="file"
          accept="image/*"
          {...register("photoFile")}
          onChange={saveImgFile}
          ref={imgRef}
        />
        <ContentArea {...register("content")}></ContentArea>
      </PostForm>
    </NewPostWrapper>
  );
}
const Title = styled.input`
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
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

const PostForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const NewPostWrapper = styled(PageWrapper)``;
const ContentArea = styled.textarea`
  min-height: 500px;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;
export default NewPost;
