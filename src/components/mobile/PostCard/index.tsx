import { Link } from "react-router-dom";
import styled from "styled-components";
import { PATH } from "../../../App";
import useGetCommentCount from "../../../hooks/comments/useGetCommentCount";
import useGetReceivedLikesCount from "../../../hooks/like/useGetReceivedLikesCount";
import ProfileForCard from "../ProfileForCard";
import React from "react";

function PostCard({
  title,
  content,
  uid,
  createdAt,
  index,
  id,
  postImage,
  viewCount,
}: Post) {
  const { commentCount } = useGetCommentCount(id ?? "");
  const { receivedLikesCount } = useGetReceivedLikesCount(id ?? "");
  console.log("receivedLikesCount", receivedLikesCount);

  return (
    <PostCardWrapper
      id={id}
      onClick={() => {
        sessionStorage.setItem(`scrollTarget-/post`, String(id));
      }}
    >
      <ProfileForCard uid={uid} createdAt={createdAt as Timestamp} />
      <GoToDetail to={`${PATH.postDetail}?no=${index}`}>
        <TitleAndInfo>
          <Title>{title}</Title>
          {postImage && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="#rgb(26, 79, 4)"
            >
              <path d="M19 3H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM5 19V5h14l.002 14H5z"></path>
              <path d="m10 14-1-1-3 4h12l-5-7z"></path>
            </svg>
          )}
        </TitleAndInfo>
        {content && <Content>{content}</Content>}
        <CountSection>
          <Count>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 4.58334L9.55 5.01667C9.6083 5.07716 9.6782 5.12527 9.75552 5.15814C9.83284 5.191 9.91599 5.20794 10 5.20794C10.084 5.20794 10.1672 5.191 10.2445 5.15814C10.3218 5.12527 10.3917 5.07716 10.45 5.01667L10 4.58334ZM5.83417 13.6833C5.70598 13.5779 5.54116 13.5277 5.37597 13.5438C5.21079 13.5599 5.05876 13.641 4.95333 13.7692C4.84791 13.8974 4.79773 14.0622 4.81382 14.2274C4.82992 14.3926 4.91098 14.5446 5.03917 14.65L5.83417 13.6833ZM1.95167 11.1758C1.99106 11.2478 2.04426 11.3114 2.10821 11.3628C2.17217 11.4143 2.24563 11.4526 2.3244 11.4757C2.40318 11.4988 2.48572 11.5061 2.56733 11.4972C2.64893 11.4884 2.72799 11.4636 2.8 11.4242C2.87201 11.3848 2.93555 11.3316 2.987 11.2676C3.03845 11.2037 3.0768 11.1302 3.09986 11.0514C3.12292 10.9727 3.13024 10.8901 3.1214 10.8085C3.11256 10.7269 3.08773 10.6478 3.04833 10.5758L1.95167 11.1758ZM2.29167 7.61417C2.29167 5.8225 3.30417 4.31917 4.68667 3.68667C6.03 3.0725 7.835 3.235 9.55 5.01667L10.45 4.15084C8.41667 2.03667 6.05333 1.6875 4.16667 2.55C2.32167 3.39417 1.04167 5.35417 1.04167 7.61417H2.29167ZM7.08083 16.25C7.50833 16.5867 7.96667 16.945 8.43083 17.2167C8.895 17.4875 9.425 17.7083 10 17.7083V16.4583C9.74167 16.4583 9.43833 16.3583 9.06167 16.1375C8.68417 15.9175 8.29333 15.6142 7.855 15.2683L7.08083 16.25ZM12.9192 16.25C14.1075 15.3125 15.6275 14.2392 16.8192 12.8967C18.0333 11.53 18.9583 9.83584 18.9583 7.61417H17.7083C17.7083 9.44584 16.9583 10.8567 15.885 12.0667C14.7892 13.3 13.4083 14.2725 12.145 15.2683L12.9192 16.25ZM18.9583 7.61417C18.9583 5.35417 17.6792 3.39417 15.8333 2.55C13.9467 1.6875 11.585 2.03667 9.55 4.15L10.45 5.01667C12.165 3.23584 13.97 3.0725 15.3133 3.68667C16.6958 4.31917 17.7083 5.82167 17.7083 7.61417H18.9583ZM12.145 15.2683C11.7067 15.6142 11.3158 15.9175 10.9383 16.1375C10.5617 16.3575 10.2583 16.4583 10 16.4583V17.7083C10.575 17.7083 11.105 17.4875 11.5692 17.2167C12.0342 16.945 12.4917 16.5867 12.9192 16.25L12.145 15.2683ZM7.855 15.2683C7.19167 14.7458 6.5175 14.2458 5.83417 13.6833L5.03917 14.65C5.73083 15.2192 6.4625 15.7625 7.08083 16.25L7.855 15.2683ZM3.04833 10.5767C2.54634 9.67036 2.28578 8.65021 2.29167 7.61417H1.04167C1.04167 8.97917 1.39167 10.1517 1.95167 11.1758L3.04833 10.5767Z"
                fill="#111827"
              />
            </svg>
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
        <DateViewWrapper>
          <ViewCount>조회 {viewCount}</ViewCount>
        </DateViewWrapper>
      </GoToDetail>
    </PostCardWrapper>
  );
}

const PostCardWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #f3f4f6;
  transition: all 0.3s ease;
  padding: 20px 20px;
`;

const GoToDetail = styled(Link)`
  text-decoration: none;
  color: black;
`;
const TitleAndInfo = styled.span`
  display: flex;
  align-items: center;
  margin: 0 0 8px 0;
`;
const Title = styled.h2`
  display: inline-block;
  align-items: center;
  font-size: 16px;
  margin-right: 4px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 1.2;
`;

const CountSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
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
const DateViewWrapper = styled.div`
  display: flex;
`;
const ViewCount = styled.div`
  font-size: 0.8rem;
  color: #666;
`;
const Content = styled.div`
  font-size: 12px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-bottom: 8px;
  line-height: 1.2;
`;

export default React.memo(PostCard);
