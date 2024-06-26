import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import styled from "styled-components";
import { createPost, getPostById, updatePost } from "../../apis/posts";
import { useAuth } from "../../context/AuthContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

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
  const createMutation = useMutation({ mutationFn: createPost });
  const updateMutation = useMutation({ mutationFn: updatePost });

  const { currentUser } = useAuth();
  const [query, setQuery] = useSearchParams();
  const postId = query.get("id") ?? "";

  const { data, isLoading, error } = useQuery<Post>({
    queryKey: ["post_detail"],
    queryFn: () => getPostById(postId),
    enabled: !!postId,
    staleTime: Infinity, // 데이터를 다시 가져오지 않도록 설정
  });

  useEffect(() => {
    if (data) {
      console.log(data);
      if (data?.content) {
        setValue("content", data?.content);
      }
      if (data?.title) {
        setValue("title", data?.title);
      }
    }
  }, [data]);

  async function onPostSubmit(postData: PostValue) {
    console.log("post", postData);
    setUpdating(true);

    try {
      if (postId) {
        await updateMutation.mutateAsync({
          uid: currentUser?.uid || "",
          postId: postId,
          title: postData.title,
          content: postData.content,
        });
      } else {
        await createMutation.mutateAsync({
          uid: currentUser?.uid || "",
          title: postData.title,
          content: postData.content,
        });
      }
    } catch (err) {
      console.log("err", err);
    }
  }
  return (
    <NewPostWrapper>
      <PostForm onSubmit={handleSubmit(onPostSubmit)}>
        <TopSection>
          <button type="button">취소</button>
          <button type="submit">저장</button>
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
