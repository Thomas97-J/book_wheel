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
import DateString from "../../../components/common/DateString";
import useGetCommentCount from "../../../hooks/comments/useGetCommentCount";
import ProfileForPost from "./ProfileForPost";

function PostDetail() {
  const { currentUser } = useAuth();
  const [query] = useSearchParams();
  const postIndex = parseInt(query.get("no") ?? "");
  const { postData, isLoading, error } = useGetPostByIndex(postIndex);
  const { receivedLikesCount } = useGetReceivedLikesCount(postData?.id ?? "");
  const { commentCount } = useGetCommentCount(postData?.id ?? "");

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
        <ProfileForPost
          uid={postData?.uid ?? ""}
          createdAt={postData?.createdAt as Timestamp}
        />
        {/* <ProfileSimple uid={postData?.uid || ""} /> */}
        {postData?.postImage && (
          <PostImg src={postData?.postImage} alt="게시글 이미지" />
        )}
        <Title>{postData?.title}</Title>
        <DataStringPost>
          <DateString date={postData?.createdAt} />
        </DataStringPost>
        <Content>{postData?.content}</Content>
        <CountSection>
          <Count>
            <LikeBtn
              userId={currentUser?.uid ?? ""}
              postId={postData?.id ?? ""}
            />
            {receivedLikesCount}
          </Count>
          <Count>
            <svg
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 17.5283C11.4834 17.5283 12.9334 17.0884 14.1668 16.2643C15.4001 15.4402 16.3614 14.2689 16.9291 12.8984C17.4968 11.528 17.6453 10.02 17.3559 8.56512C17.0665 7.11026 16.3522 5.77389 15.3033 4.72499C14.2544 3.6761 12.918 2.96179 11.4632 2.6724C10.0083 2.38301 8.50032 2.53154 7.12987 3.0992C5.75943 3.66685 4.58809 4.62815 3.76398 5.86152C2.93987 7.09488 2.5 8.54493 2.5 10.0283C2.5 11.2683 2.8 12.4375 3.33333 13.4675L2.5 17.5283L6.56083 16.695C7.59083 17.2283 8.76083 17.5283 10 17.5283Z"
                stroke="#111827"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {commentCount}{" "}
          </Count>
        </CountSection>
        <CenterWrapper>
          <ViewCount>조회 {postData?.viewCount}</ViewCount>
        </CenterWrapper>
      </PostDetailBody>
      {postData?.id && <CommentSection postId={postData.id} />}
    </PostDetailWrapper>
  );
}

const PostDetailWrapper = styled(PageWrapper)``;
const PostDetailBody = styled.div`
  padding: 0 20px;
  overflow-x: hidden;
`;
const Title = styled.h2`
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 8px;
`;

const PostImg = styled.img`
  width: calc(100% + 20 * 2px);

  margin: 0 0 20px -20px;
  object-fit: contain;
  margin-bottom: 10px;
`;
const CountSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
`;
const Count = styled.span`
  font-size: 12px;
  font-weight: normal;
  color: #111827;
  display: flex;
  align-items: center;
  white-space: nowrap;
  text-align: center;
  letter-spacing: -0.04em;
  margin-right: 12px;
  svg {
    margin-top: 2px;
    margin-right: 4px;
    height: 18px;
    width: 18px;
  }
`;

const CenterWrapper = styled.div`
  width: 100%;
`;
const Content = styled.pre`
  font-size: 14px;
  line-height: 1.2;
  color: #333;
  white-space: pre-wrap;
`;
const ViewCount = styled.div`
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
`;
const DataStringPost = styled.div`
  margin-bottom: 8px;
`;

export default PostDetail;
