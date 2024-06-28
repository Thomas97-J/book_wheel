import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { PATH } from "../../App";
import useCreatePostWithIndex from "../../hooks/posts/useCreatePostWithIndex";
import useUpdatePostByIndex from "../../hooks/posts/useUpdatePostByIndex";
import useGetPostByIndex from "../../hooks/posts/useGetPostByIndex";
import DropDownSelect from "../../components/common/DropDownSelect";

interface PostValue {
  title: string;
  content: string;
  category: string;
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

  const postIndex = parseInt(query.get("no") ?? "");
  const { postData, isLoading, error } = useGetPostByIndex(postIndex);
  const createMutation = useCreatePostWithIndex();
  const updateMutation = useUpdatePostByIndex();

  const navigate = useNavigate();
  const options = [
    { label: "도서", value: "book" },
    { label: "취미", value: "hobby" },
    { label: "전체", value: "all" },
  ];

  const handleSelect = (option: { label: string; value: string }) => {
    console.log("Selected option:", option);
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
    console.log("post", postData);

    try {
      if (postIndex) {
        await updateMutation.mutateAsync({
          uid: currentUser?.uid || "",
          index: postIndex,
          title: postData.title,
          content: postData.content,
          category: postData.category,
        });
        navigate(`${PATH.postDetail}?no=${postIndex}`);
      } else {
        const newPostIndex = await createMutation.mutateAsync({
          uid: currentUser?.uid || "",
          title: postData.title,
          content: postData.content,
          category: postData.category,
        });
        navigate(`${PATH.postDetail}?no=${newPostIndex}`);
      }
    } catch (err) {
      console.log("err", err);
    }
  }
  return (
    <NewPostWrapper>
      <PostForm onSubmit={handleSubmit(onPostSubmit)}>
        <TopSection>
          <button
            type="button"
            onClick={() => {
              navigate(-1);
            }}
          >
            취소
          </button>
          <button type="submit">저장</button>
        </TopSection>
        <DropDownSelect
          options={options}
          onSelect={handleSelect}
          placeholder="Select an option"
        />

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

const TopSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const PostForm = styled.form`
  display: flex;
  flex-direction: column;
`;
const NewPostWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
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
