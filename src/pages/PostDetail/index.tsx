import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import styled from "styled-components";
import { getPostById, getPostByIndex } from "../../apis/posts";
import { useSearchParams } from "react-router-dom";
import Fallback from "../../components/mobile/Fallback";
import UserInfo from "./UserInfo";
import PostHeader from "../../components/mobile/headers/PostHeader";
import { useAuth } from "../../context/AuthContext";

function PostDetail() {
  const [query, setQuery] = useSearchParams();
  const postIndex = parseInt(query.get("no") ?? "");

  const { data, isLoading, error } = useQuery<Post>({
    queryKey: ["post_detail"],
    queryFn: () => getPostByIndex(postIndex),
  });
  const { currentUser } = useAuth();

  useEffect(() => {
    console.log("포스트디테일", data);
  }, [data]);

  if (isLoading) {
    return <Fallback />;
  }
  return (
    <PostDetailWrapper>
      <PostHeader user={currentUser} postData={data} />
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
