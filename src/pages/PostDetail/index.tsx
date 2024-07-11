import React, { useEffect } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { useSearchParams } from "react-router-dom";
import Fallback from "../../components/mobile/Fallback";
import PostHeader from "../../components/mobile/headers/PostHeader";
import { useAuth } from "../../context/AuthContext";
import useGetPostByIndex from "../../hooks/posts/useGetPostByIndex";
import PageWrapper from "../../assets/styles/PageWrapper";
import LikeBtn from "../../components/mobile/LikeBtn";
import useGetReceivedLikesCount from "../../hooks/like/useGetReceivedLikesCount";
import CommentSection from "./CommentSection";
import ProfileSimple from "../../components/mobile/ProfileSimple";
import DateString from "../../components/common/DateString";

function PostDetail() {
  const { currentUser } = useAuth();
  const [query, setQuery] = useSearchParams();
  const postIndex = parseInt(query.get("no") ?? "");
  const { postData, isLoading, error } = useGetPostByIndex(postIndex);
  const { receivedLikesCount } = useGetReceivedLikesCount(postData?.id ?? "");

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
      {postData?.postImage && (
        <img src={postData?.postImage} alt="게시글 이미지" />
      )}
      <Title>{postData?.title}</Title>
      <DataStringPost>
        <DateString date={postData?.createdAt} />
      </DataStringPost>
      <div>{postData?.content}</div>
      <LikeAndCount>
        <LikeBtn userId={currentUser?.uid ?? ""} postId={postData?.id ?? ""} />:{" "}
        {receivedLikesCount}
      </LikeAndCount>
      {postData?.id && <CommentSection postId={postData.id} />}
    </PostDetailWrapper>
  );
}
const PostDetailWrapper = styled(PageWrapper)``;
const Title = styled.h2`
  font-weight: bold;
  margin-bottom: 8px;
`;
const DataStringPost = styled.div`
  margin-bottom: 8px;
`;
const LikeAndCount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default PostDetail;
