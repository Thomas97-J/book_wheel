import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { PATH } from "../../../App";
import useCreatePostWithIndex from "../../../hooks/posts/useCreatePostWithIndex";
import useUpdatePostByIndex from "../../../hooks/posts/useUpdatePostByIndex";
import useGetPostByIndex from "../../../hooks/posts/useGetPostByIndex";
import DropDownSelect from "../../../components/common/DropDownSelect";
import PageWrapper from "../../../assets/styles/PageWrapper";
import PostEditHeader from "../../../components/mobile/headers/PostEditHeader";
import { useUploadImgFile } from "../../../hooks/firestore/useUploadImgFile";
import useImageUpload from "../../../hooks/common/useImageUpload";
import { v4 as uuidv4 } from "uuid";
import Warn from "../../../components/common/Warn";
import useDeleteImageInPost from "../../../hooks/posts/useDeleteImageInPost";

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
  const imageDeleteMutation = useDeleteImageInPost();
  const { imagePreview, setImagePreview, imgRef, saveImgFile } =
    useImageUpload(setValue);
  const [submitBtnDisable, setSubmitBtnDisable] = useState(false);

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
  }, [postData, postIndex]);

  async function onPostSubmit(postData: PostValue) {
    try {
      setSubmitBtnDisable(true);
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
          `/posts/${currentUser?.uid}/${uuidv4()}`
        );
        updatedPostData.postImage = downloadURL;
      }

      const isFixPost = !!postIndex;
      if (isFixPost) {
        if (postData?.postImage === "removed") {
          console.log("removed");
          await imageDeleteMutation.mutateAsync({ index: postIndex });
        }
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
      setSubmitBtnDisable(false);
      console.log("err", err);
    }
  }

  return (
    <NewPostWrapper>
      <PostEditHeader submitBtnDisable={submitBtnDisable} />
      <EditBody>
        <PostForm id={"postForm"} onSubmit={handleSubmit(onPostSubmit)}>
          <CategoryAndImage>
            <DropDownSelect
              options={options}
              onSelect={handleSelect}
              placeholder="전체"
            />
            <UploadLabel htmlFor="imageInput">사진 추가</UploadLabel>
            <FileInput
              id="imageInput"
              type="file"
              accept="image/*"
              {...register("photoFile")}
              onChange={saveImgFile}
              ref={imgRef}
            />
          </CategoryAndImage>

          {imagePreview && (
            <ImagePreview>
              <img src={imagePreview} alt="Preview" />
              <button
                type="button"
                onClick={() => {
                  setValue("postImage", "removed");
                  setValue("photoFile", undefined);
                  setImagePreview(null);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="rgba(0, 0, 0, 0.7)"
                >
                  <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm4.207 12.793-1.414 1.414L12 13.414l-2.793 2.793-1.414-1.414L10.586 12 7.793 9.207l1.414-1.414L12 10.586l2.793-2.793 1.414 1.414L13.414 12l2.793 2.793z"></path>
                </svg>
              </button>
            </ImagePreview>
          )}
          <Title
            {...register("title", {
              required: "제목을 입력해 주세요.",
              minLength: {
                value: 1,
                message: "제목을 입력해 주세요.",
              },
            })}
            type="text"
            placeholder="제목을 입력하세요."
          />
          <Warn>{errors?.title?.message}</Warn>
          <ContentArea
            {...register("content")}
            placeholder="내용을 입력하세요."
          />
        </PostForm>
      </EditBody>
    </NewPostWrapper>
  );
}
const FileInput = styled.input`
  display: none;
`;

const UploadLabel = styled.label`
  color: ${({ theme }) => theme.color.default_green};
`;
const Title = styled.input`
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const ImagePreview = styled.div`
  position: relative;
  width: 100%;
  img {
    width: 100%;

    object-fit: contain;
    margin-bottom: 10px;
  }
  button {
    border: none;
    position: absolute;
    top: 10px;
    right: 4px;
  }
`;

const PostForm = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const NewPostWrapper = styled(PageWrapper)``;
const EditBody = styled.div`
  padding: 0 10px;
`;
const CategoryAndImage = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ContentArea = styled.textarea`
  min-height: 400px;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;
export default NewPost;
