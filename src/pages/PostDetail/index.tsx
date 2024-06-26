import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import styled from "styled-components";
import { getPostById } from "../../apis/posts";
import { useSearchParams } from "react-router-dom";
import Fallback from "../../components/mobile/Fallback";
import UserInfo from "./UserInfo";
import PostHeader from "../../components/mobile/headers/PostHeader";
import { useAuth } from "../../context/AuthContext";

function PostDetail() {
  const [query, setQuery] = useSearchParams();
  const postId = query.get("id") ?? "";
  const { data, isLoading, error } = useQuery<Post>({
    queryKey: ["post_detail"],
    queryFn: () => getPostById(postId),
  });
  const { currentUser } = useAuth();

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (isLoading) {
    return <Fallback />;
  }
  return (
    <PostDetailWrapper>
      <PostHeader user={currentUser} postData={data} postId={postId} />
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
