import { useEffect } from "react";
import styled from "styled-components";
import useGetUserById from "../../../hooks/users/useGetUserById";
import { PATH } from "../../../App";
import { Link } from "react-router-dom";
import { useDeleteComment } from "../../../hooks/comments/useDeleteComment";
import { useAuth } from "../../../context/AuthContext";

function CommentCard({ comment }: { comment: any }) {
  const { userData } = useGetUserById(comment.uid);
  const { currentUser } = useAuth();
  const isCommentOwner = comment.uid === currentUser?.uid;

  const deleteMutation = useDeleteComment(comment.postId);

  useEffect(() => {
    console.log("comment", comment);
  }, [comment]);

  return (
    <CommentCardWrapper>
      <Link to={`${PATH.profile}?user=${userData?.nickname}`}>
        {userData?.nickname}
      </Link>
      {comment?.content}
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
    </CommentCardWrapper>
  );
}
const CommentCardWrapper = styled.div`
  /* Add your styles here */
`;
export default CommentCard;
