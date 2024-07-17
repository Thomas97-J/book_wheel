import { useEffect } from "react";
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import Fallback from "../../../components/mobile/Fallback";
import PostHeader from "../../../components/mobile/headers/PostHeader";
import { useAuth } from "../../../context/AuthContext";
import useGetPostByIndex from "../../../hooks/posts/useGetPostByIndex";
import PageWrapper from "../../../assets/styles/PageWrapper";
import LikeBtn from "../../../components/mobile/LikeBtn";
import useGetReceivedLikesCount from "../../../hooks/like/useGetReceivedLikesCount";
import CommentSection from "./CommentSection";
import ProfileSimple from "../../../components/mobile/ProfileSimple";
import DateString from "../../../components/common/DateString";

function PostDetail() {
  const { currentUser } = useAuth();
  const [query] = useSearchParams();
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
      <PostDetailBody>
        <ProfileSimple uid={postData?.uid || ""} />
        {postData?.postImage && (
          <PostImg src={postData?.postImage} alt="게시글 이미지" />
        )}
        <Title>{postData?.title}</Title>
        <DataStringPost>
          <DateString date={postData?.createdAt} />
        </DataStringPost>
        <Content>{postData?.content}</Content>
        <CenterWrapper>
          <ViewCount>조회 {postData?.viewCount}</ViewCount>
          <LikeAndCount>
            <LikeBtn
              userId={currentUser?.uid ?? ""}
              postId={postData?.id ?? ""}
            />
            {receivedLikesCount}
          </LikeAndCount>
        </CenterWrapper>
      </PostDetailBody>
      {postData?.id && <CommentSection postId={postData.id} />}
    </PostDetailWrapper>
  );
}

const PostDetailWrapper = styled(PageWrapper)``;
const PostDetailBody = styled.div`
  padding: 0 10px;
`;
const Title = styled.h2`
  font-weight: bold;
  margin-bottom: 8px;
`;

const PostImg = styled.img`
  width: 100%;
  object-fit: contain;
  margin-bottom: 10px;
`;
const CenterWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;
const Content = styled.p`
  font-size: 14px;
  color: #333;
`;
const ViewCount = styled.div`
  font-size: 1rem;
  color: #666;
  margin-bottom: 4px;
`;
const DataStringPost = styled.div`
  margin-bottom: 8px;
`;
const LikeAndCount = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  padding: 4px;
  width: 52px;
  white-space: nowrap;
`;
export default PostDetail;
