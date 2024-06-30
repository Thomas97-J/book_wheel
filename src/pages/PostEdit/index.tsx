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

interface PostValue {
  uid: string;
  title: string;
  content: string;
  category: string;
  photoFile?: any;
  profileImage?: string;
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
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { uploadImgFile, isUploading } = useUploadImgFile({
    maxSizeMB: 0.2,
    maxWidthOrHeight: 256,
  });
  const postIndex = parseInt(query.get("no") ?? "");
  const { postData, isLoading, error } = useGetPostByIndex(postIndex);
  const createMutation = useCreatePostWithIndex();
  const updateMutation = useUpdatePostByIndex();
  const imgRef = useRef<HTMLInputElement | null>(null);

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
      if (postData?.content) {
        setValue("content", postData?.content);
      }
      if (postData?.title) {
        setValue("title", postData?.title);
      }
    }
  }, [postData, currentUser, navigate, postIndex, setValue]);

  async function onPostSubmit(postData: PostValue) {
    try {
      const updatedPostData: PostValue = {
        uid: currentUser?.uid || "",
        title: postData.title,
        content: postData.content,
        category: postData.category,
      };
      if (postData?.photoFile) {
        const downloadURL = await uploadImgFile(postData.photoFile, ``);
        updatedPostData.profileImage = downloadURL;
      } else if (postData?.profileImage) {
        updatedPostData.profileImage = postData?.profileImage;
      }

      const isFixPost = !!postIndex;
      if (isFixPost) {
        await updateMutation.mutateAsync({
          uid: currentUser?.uid || "",
          index: postIndex,
          title: postData.title,
          content: postData.content,
          areaNo: 1,
          category: postData.category,
        });
        navigate(`${PATH.postDetail}?no=${postIndex}`);
      } else {
        const { id, index: newPostIndex } = await createMutation.mutateAsync({
          uid: currentUser?.uid || "",
          title: postData.title,
          content: postData.content,
          areaNo: 1,
          category: postData.category,
        });
        navigate(`${PATH.postDetail}?no=${newPostIndex}`);
      }
    } catch (err) {
      console.log("err", err);
    }
  }

  function saveImgFile() {
    if (
      imgRef.current &&
      imgRef.current.files &&
      imgRef.current.files.length > 0
    ) {
      const file = imgRef?.current.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      setValue("photoFile", file); // Update react-hook-form value
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
