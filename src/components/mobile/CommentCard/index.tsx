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

function CommentCard({
  comment,
  handleReplyPopupOpen,
}: {
  comment: any;
  handleReplyPopupOpen: (bool: boolean, content: any) => void;
}) {
  const { userData } = useGetUserById(comment.uid);
  const { currentUser } = useAuth();
  const isCommentOwner = comment.uid === currentUser?.uid;
  const isHasRepliesy = comment?.replies.length !== 0;
  const deleteMutation = useDeleteComment(comment.postId);
  const { receivedLikesCount } = useGetReceivedCommentLikesCount(comment.id);
  useEffect(() => {
    console.log("comment", comment);
  }, [comment]);

  return (
    <CommentCardWrapper>
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
      {isHasRepliesy &&
        comment.replies.map(
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
    </CommentCardWrapper>
  );
}

const DeleteBtn = styled.button`
  position: absolute;
  right: 10px;
  top: 12px;
  padding: 0;
  border: none;
`;
const ProfileLink = styled(Link)`
  text-decoration: none;
  color: #414141;
  margin-right: 6px;
`;
const InfoSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
`;
const ContentSection = styled.button`
  border: none;
  padding: 0;
  display: flex;
`;
const CommentLikeCount = styled.div`
  font-size: 12px;
  margin-left: 2px;
`;
const Content = styled.span`
  font-size: 14px;
`;
const CommentCardWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 4px 0;
  border-bottom: 1px solid #ccc;
`;
export default CommentCard;
