import { useEffect, useState } from "react";
import styled from "styled-components";
import useGetUserById from "../../../hooks/users/useGetUserById";
import { PATH } from "../../../App";
import { Link } from "react-router-dom";
import { useDeleteComment } from "../../../hooks/comments/useDeleteComment";
import { useAuth } from "../../../context/AuthContext";
import LikeBtnComment from "../LikeBtnComment";
import ReplyCard from "./ReplyCard";
import DateString from "../../common/DateString";
import useGetReceivedCommentLikesCount from "../../../hooks/like/useGetReceivedCommentLikesCount";
import imgPaths from "../../../assets/images/image_path";

function CommentCard({
  comment,
  handleReplyPopupOpen,
  withOutReply,
}: {
  comment: any;
  handleReplyPopupOpen: (bool: boolean, content: any) => void;
  withOutReply?: boolean;
}) {
  const { userData } = useGetUserById(comment.uid);
  const { currentUser } = useAuth();
  const isCommentOwner = comment.uid === currentUser?.uid;
  const isHasReplies = comment?.replies.length !== 0 && !withOutReply;
  const deleteMutation = useDeleteComment(comment.postId);
  const { receivedLikesCount } = useGetReceivedCommentLikesCount(comment.id);
  useEffect(() => {
    console.log("comment", comment);
  }, [comment]);

  return (
    <CommentCardWrapper>
      <Profile
        src={userData?.profileImage ?? imgPaths.defaultProfileImage}
        alt="프로필 이미지"
      />
      <Wrapper>
        <InfoSection>
          <ProfileLink to={`${PATH.profile}?user=${userData?.nickname}`}>
            {userData?.nickname}
          </ProfileLink>
          <DateString date={comment.createdAt} />
          <LikeBtnComment
            userId={currentUser?.uid ?? ""}
            commentId={comment?.id}
          />
          <CommentLikeCount>{receivedLikesCount}</CommentLikeCount>
        </InfoSection>
        <ContentSection
          onClick={() => {
            handleReplyPopupOpen(true, { comment, userData });
          }}
        >
          <Content>{comment?.content}</Content>
        </ContentSection>
        {isCommentOwner && (
          <DeleteBtn
            onClick={async () => {
              if (isCommentOwner) {
                await deleteMutation.mutateAsync(comment?.id);
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="rgba(0, 0, 0, 0.3)"
            >
              <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm4.207 12.793-1.414 1.414L12 13.414l-2.793 2.793-1.414-1.414L10.586 12 7.793 9.207l1.414-1.414L12 10.586l2.793-2.793 1.414 1.414L13.414 12l2.793 2.793z"></path>
            </svg>
          </DeleteBtn>
        )}
        {isHasReplies && (
          <ReplyCardWrapper
            onClick={() => {
              handleReplyPopupOpen(true, { comment, userData });
            }}
          >
            {comment.replies.map(
              (reply: {
                content: string;
                createdAt: Timestamp;
                userId: string;
                id: string;
              }) => (
                <ReplyCard
                  key={reply?.id}
                  id={reply?.id}
                  content={reply.content}
                  commentId={comment?.id}
                  createdAt={reply.createdAt}
                  postId={comment.postId}
                  userId={reply.userId}
                />
              )
            )}
          </ReplyCardWrapper>
        )}
      </Wrapper>
    </CommentCardWrapper>
  );
}
const Profile = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 10px;
`;
const Wrapper = styled.div`
  width: 100%;
`;
const DeleteBtn = styled.button`
  position: absolute;
  right: 20px;
  top: 6px;
  padding: 0;
  border: none;
`;
const ProfileLink = styled(Link)`
  text-decoration: none;
  color: #414141;
  margin-right: 6px;
  font-weight: bold;
  font-size: 14px;
`;
const InfoSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
`;

const CommentLikeCount = styled.div`
  font-size: 12px;
  margin-left: 2px;
`;
const ContentSection = styled.button`
  border: none;
  padding: 0;
  display: flex;
  width: 100%;
`;
const Content = styled.span`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 8px;
  font-size: 14px;
  background-color: #e5e7eb;
  width: 100%;
  min-height: 32px;
  border-radius: 10px;
  word-break: break-all;
  text-align: left;
`;
const ReplyCardWrapper = styled.button`
  border: none;
  width: 100%;
  padding: 0;
`;
const CommentCardWrapper = styled.div`
  position: relative;
  display: flex;
  padding: 8px 20px;
`;
export default CommentCard;
