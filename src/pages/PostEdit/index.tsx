import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  createPost,
  createPostWithIndex,
  getPostById,
  getPostByIndex,
  updatePost,
  updatePostByIndex,
} from "../../apis/posts";
import { useAuth } from "../../context/AuthContext";
import { PATH } from "../../App";

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
  const queryClient = useQueryClient();
  const createMutation = useMutation({
    mutationFn: createPostWithIndex,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post_detail"] });
    },
  });
  const updateMutation = useMutation({
    mutationFn: updatePostByIndex,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post_detail"] });
    },
  });

  const { currentUser } = useAuth();
  const [query, setQuery] = useSearchParams();
  const postIndex = parseInt(query.get("no") ?? "");

  const { data, isLoading, error } = useQuery<Post>({
    queryKey: ["post_detail"],
    queryFn: () => getPostByIndex(postIndex),
    enabled: !!postIndex,
    staleTime: Infinity, // 데이터를 다시 가져오지 않도록 설정
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (data && postIndex) {
      if (!currentUser || (currentUser && currentUser?.uid !== data.uid)) {
        alert("잘못된 접근입니다.");
        navigate(-1);
      }
      if (data?.content) {
        setValue("content", data?.content);
      }
      if (data?.title) {
        setValue("title", data?.title);
      }
    }
  }, [data, currentUser, navigate, postIndex, setValue]);

  async function onPostSubmit(postData: PostValue) {
    console.log("post", postData);
    setUpdating(true);

    try {
      if (postIndex) {
        await updateMutation.mutateAsync({
          uid: currentUser?.uid || "",
          index: postIndex,
          title: postData.title,
          content: postData.content,
        });
        navigate(`${PATH.postDetail}?no=${postIndex}`);
      } else {
        const postIndex = await createMutation.mutateAsync({
          uid: currentUser?.uid || "",
          title: postData.title,
          content: postData.content,
        });
        navigate(`${PATH.postDetail}?no=${postIndex}`);
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
        <ContentArea {...register("content")}></ContentArea>
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
const ContentArea = styled.textarea`
  min-height: 500px;
`;
export default NewPost;
