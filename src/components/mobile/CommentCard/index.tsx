import { useEffect, useState } from "react";
import styled from "styled-components";
import useGetUserById from "../../../hooks/users/useGetUserById";
import { PATH } from "../../../App";
import { Link } from "react-router-dom";
import { useDeleteComment } from "../../../hooks/comments/useDeleteComment";
import { useAuth } from "../../../context/AuthContext";
import formatRelativeTime from "../../../utils/formatRelativeTime";
import LikeBtnComment from "../LikeBtnComment";
import ReplyCard from "./ReplyCard";

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
  const formattedDate = formatRelativeTime(comment.createdAt as Timestamp);
  useEffect(() => {
    console.log("comment", comment);
  }, [comment]);

  return (
    <CommentCardWrapper>
      <InfoSection>
        <ProfileLink to={`${PATH.profile}?user=${userData?.nickname}`}>
          {userData?.nickname}
        </ProfileLink>
        <span>{formattedDate}</span>
        <LikeBtnComment
          userId={currentUser?.uid ?? ""}
          commentId={comment?.id}
        />
      </InfoSection>

      <ContentSection
        onClick={() => {
          handleReplyPopupOpen(true, { comment, userData });
        }}
      >
        <span>{comment?.content}</span>
      </ContentSection>
      {isCommentOwner && (
        <DeleteBtn
          onClick={async () => {
            if (isCommentOwner) {
              await deleteMutation.mutateAsync(comment?.id);
            }
          }}
        >
          삭제
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
`;
const ProfileLink = styled(Link)`
  text-decoration: none;
  color: #414141;
  margin-right: 6px;
`;
const InfoSection = styled.div``;
const ContentSection = styled.button`
  border: none;
  padding: 0;
  display: flex;
`;
const CommentCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4px 0;
  border-bottom: 1px solid #ccc;
`;
export default CommentCard;
