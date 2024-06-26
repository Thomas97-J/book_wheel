import React, { useState } from "react";
import { useForm } from "react-hook-form";

import styled from "styled-components";
import { createPost } from "../../apis/posts";
import { useAuth } from "../../context/AuthContext";
import { useMutation } from "@tanstack/react-query";

interface PostValue {
  title: string;
  content: string;
}
function NewPost() {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isValid },
  } = useForm<PostValue>({
    mode: "onBlur",
  });
  const [updating, setUpdating] = useState(false);
  const mutation = useMutation({ mutationFn: createPost });
  const { currentUser } = useAuth();

  async function onPostSubmit(postData: PostValue) {
    console.log("post", postData);
    setUpdating(true);

    try {
      await mutation.mutateAsync({
        uid: currentUser?.uid || "",
        title: postData.title,
        content: postData.content,
      });
    } catch (err) {
      console.log("err", err);
    }
  }
  return (
    <NewPostWrapper>
      <PostForm onSubmit={handleSubmit(onPostSubmit)}>
        <TopSection>
          <button type="button">취소</button>
          <button type="submit">완료</button>
        </TopSection>
        <label>게시글의 주제를 선택해주세요</label>
        <input
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
        <textarea {...register("content")}></textarea>
      </PostForm>
    </NewPostWrapper>
  );
}
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

export default NewPost;
