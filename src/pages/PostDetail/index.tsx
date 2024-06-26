import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import styled from "styled-components";
import { getPostById } from "../../apis/posts";
import { useSearchParams } from "react-router-dom";
import Fallback from "../../components/mobile/Fallback";
import UserInfo from "./UserInfo";
import PostHeader from "../../components/mobile/headers/PostHeader";

function PostDetail() {
  const [query, setQuery] = useSearchParams();
  const postId = query.get("id") ?? "";
  const { data, isLoading, error } = useQuery<Post>({
    queryKey: ["post_detail"],
    queryFn: () => getPostById(postId),
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (isLoading) {
    return <Fallback />;
  }
  return (
    <PostDetailWrapper>
      <PostHeader />
      <UserInfo uid={data?.uid || ""} />
      <h2>{data?.title}</h2>
      <div>{data?.content}</div>
    </PostDetailWrapper>
  );
}
const PostDetailWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;

  padding: 60px 0 60px;
  position: relative;
`;

export default PostDetail;
