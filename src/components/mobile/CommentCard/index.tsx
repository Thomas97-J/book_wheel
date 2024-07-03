import { useEffect } from "react";
import styled from "styled-components";
import useGetUserById from "../../../hooks/users/useGetUserById";
import { PATH } from "../../../App";
import { Link } from "react-router-dom";
import { useDeleteComment } from "../../../hooks/comments/useDeleteComment";
import { useAuth } from "../../../context/AuthContext";
import formatRelativeTime from "../../../utils/formatRelativeTime";
import LikeBtnComment from "../LikeBtnComment";

function CommentCard({ comment }: { comment: any }) {
  const { userData } = useGetUserById(comment.uid);
  const { currentUser } = useAuth();
  const isCommentOwner = comment.uid === currentUser?.uid;

  const deleteMutation = useDeleteComment(comment.postId);
  const formattedDate = formatRelativeTime(comment.createdAt as Timestamp);
  useEffect(() => {
    console.log("comment", comment);
  }, [comment]);

  return (
    <CommentCardWrapper>
      <InfoSection>
        <Link to={`${PATH.profile}?user=${userData?.nickname}`}>
          {userData?.nickname}
        </Link>
        <span>{formattedDate}</span>
      </InfoSection>
      <ContentSection>
        <span>{comment?.content}</span>
        <LikeBtnComment
          userId={currentUser?.uid ?? ""}
          commentId={comment?.id}
        />
        {isCommentOwner && (
          <button
            onClick={async () => {
              if (isCommentOwner) {
                await deleteMutation.mutateAsync(comment?.id);
              }
            }}
          >
            삭제
          </button>
        )}
      </ContentSection>
    </CommentCardWrapper>
  );
}
const InfoSection = styled.div``;
const ContentSection = styled.div`
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
`;
const CommentCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4px 0;
`;
export default CommentCard;
