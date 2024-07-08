import React, { useEffect } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { useSearchParams } from "react-router-dom";
import Fallback from "../../components/mobile/Fallback";
import UserInfo from "./UserInfo";
import PostHeader from "../../components/mobile/headers/PostHeader";
import { useAuth } from "../../context/AuthContext";
import useGetPostByIndex from "../../hooks/posts/useGetPostByIndex";
import PageWrapper from "../../assets/styles/PageWrapper";
import LikeBtn from "../../components/mobile/LikeBtn";
import useGetReceivedLikesCount from "../../hooks/like/useGetReceivedLikesCount";
import CommentSection from "./CommentSection";
import ProfileSimple from "../../components/mobile/ProfileSimple";

function PostDetail() {
  const { currentUser } = useAuth();
  const [query, setQuery] = useSearchParams();
  const postIndex = parseInt(query.get("no") ?? "");
  const { postData, isLoading, error } = useGetPostByIndex(postIndex);
  const { receivedLikesCount } = useGetReceivedLikesCount(postData?.id ?? "");
  const formattedDate = dayjs
    .unix(postData?.createdAt?.seconds ?? 0)
    .format("YYYY-MM-DD");

  useEffect(() => {
    console.log(postData?.postImage);
  }, [postData]);

  useEffect(() => {
    console.log("receivedLikesCount", receivedLikesCount);
  }, [receivedLikesCount]);
  if (isLoading) {
    return <Fallback />;
  }
  return (
    <PostDetailWrapper>
      <PostHeader user={currentUser} postData={postData} />
      <ProfileSimple uid={postData?.uid || ""} />
      <div>{formattedDate}</div>
      {postData?.postImage && (
        <img src={postData?.postImage} alt="게시글 이미지" />
      )}
      <h2>{postData?.title}</h2>
      <div>{postData?.content}</div>
      <div>like: {receivedLikesCount}</div>
      <LikeBtn userId={currentUser?.uid ?? ""} postId={postData?.id ?? ""} />
      {postData?.id && <CommentSection postId={postData.id} />}
    </PostDetailWrapper>
  );
}
const PostDetailWrapper = styled(PageWrapper)``;

export default PostDetail;
