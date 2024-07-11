import styled from "styled-components";

import { useMemo } from "react";
import _ from "lodash";
import useGetCommentLikeId from "../../../hooks/like/useGetCommentLikeId";
import useCreateCommentLike from "../../../hooks/like/useCreateCommentLike";
import useDeleteCommentLike from "../../../hooks/like/useDeleteCommentLike";

function LikeBtnComment({
  userId,
  commentId,
}: {
  userId: string;
  commentId: string;
}) {
  const { likeId } = useGetCommentLikeId(userId, commentId);
  const likeMutation = useCreateCommentLike(userId, commentId);
  const unLikeMutation = useDeleteCommentLike(userId, commentId);

  async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    console.log("likeId", likeId);
    e.stopPropagation();
    if (likeId) {
      await unLikeMutation.mutateAsync(likeId);
    } else {
      if (userId && commentId) {
        await likeMutation.mutateAsync({
          userId: userId,
          commentId: commentId,
        });
      }
    }
  }

  const debouncedClick = useMemo(
    () => _.debounce(handleClick, 100),
    [likeId, userId, commentId]
  );

  return (
    <LikeBtnWrapper onClick={debouncedClick}>
      {likeId ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="rgba(0, 0, 0, 1)"
        >
          <path d="M4 21h1V8H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2zM20 8h-7l1.122-3.368A2 2 0 0 0 12.225 2H12L7 7.438V21h11l3.912-8.596L22 12v-2a2 2 0 0 0-2-2z"></path>
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="rgba(0, 0, 0, 1)"
        >
          <path d="M20 8h-5.612l1.123-3.367c.202-.608.1-1.282-.275-1.802S14.253 2 13.612 2H12c-.297 0-.578.132-.769.36L6.531 8H4c-1.103 0-2 .897-2 2v9c0 1.103.897 2 2 2h13.307a2.01 2.01 0 0 0 1.873-1.298l2.757-7.351A1 1 0 0 0 22 12v-2c0-1.103-.897-2-2-2zM4 10h2v9H4v-9zm16 1.819L17.307 19H8V9.362L12.468 4h1.146l-1.562 4.683A.998.998 0 0 0 13 10h7v1.819z"></path>
        </svg>
      )}
    </LikeBtnWrapper>
  );
}
const LikeBtnWrapper = styled.button`
  border: none;
  padding: 0;
  display: flex;
  align-items: center;
  margin-left: 4px;
`;
export default LikeBtnComment;
