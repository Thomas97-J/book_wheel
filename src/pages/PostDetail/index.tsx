import React, { useEffect } from "react";
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import Fallback from "../../components/mobile/Fallback";
import UserInfo from "./UserInfo";
import PostHeader from "../../components/mobile/headers/PostHeader";
import { useAuth } from "../../context/AuthContext";
import useGetPostByIndex from "../../hooks/posts/useGetPostByIndex";

function PostDetail() {
  const { currentUser } = useAuth();
  const [query, setQuery] = useSearchParams();
  const postIndex = parseInt(query.get("no") ?? "");
  const { postData, isLoading, error } = useGetPostByIndex(postIndex);

  useEffect(() => {
    console.log("포스트디테일", postData);
  }, [postData]);

  if (isLoading) {
    return <Fallback />;
  }
  return (
    <PostDetailWrapper>
      <PostHeader user={currentUser} postData={postData} />
      <UserInfo uid={postData?.uid || ""} />
      <h2>{postData?.title}</h2>
      <div>{postData?.content}</div>
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
