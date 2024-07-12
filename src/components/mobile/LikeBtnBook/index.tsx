import styled from "styled-components";
import { useMemo } from "react";
import _ from "lodash";
import useGetBookLikeId from "../../../hooks/like/useGetBookLikeId";
import useCreateBookLike from "../../../hooks/like/useCreateBookLike";
import useDeleteBookLike from "../../../hooks/like/useDeleteBookLike";

function LikeBtnBook({ userId, bookId }: { userId: string; bookId: string }) {
  const { likeId } = useGetBookLikeId(userId, bookId);
  const likeMutation = useCreateBookLike(userId, bookId);
  const unLikeMutation = useDeleteBookLike(userId, bookId);

  async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    if (likeId) {
      await unLikeMutation.mutateAsync(likeId);
    } else {
      if (userId && bookId) {
        await likeMutation.mutateAsync({ userId: userId, bookId: bookId });
      }
    }
  }

  const debouncedClick = useMemo(
    () => _.debounce(handleClick, 100),
    [likeId, userId, bookId]
  );

  return (
    <LikeBtnWrapper onClick={debouncedClick}>
      {likeId ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="rgba(0, 0, 0, 1)"
        >
          <path d="M3 8v11c0 2.201 1.794 3 3 3h15v-2H6.012C5.55 19.988 5 19.806 5 19s.55-.988 1.012-1H21V4c0-1.103-.897-2-2-2H6c-1.206 0-3 .799-3 3v3zm3-4h13v12H5V5c0-.806.55-.988 1-1z"></path>
          <path d="m11.997 14 3.35-3.289a2.129 2.129 0 0 0 0-3.069 2.225 2.225 0 0 0-3.126 0l-.224.218-.224-.219a2.224 2.224 0 0 0-3.125 0 2.129 2.129 0 0 0 0 3.069L11.997 14z"></path>
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="rgba(0, 0, 0, 1)"
        >
          <path d="M19 2H6c-1.206 0-3 .799-3 3v14c0 2.201 1.794 3 3 3h15v-2H6.012C5.55 19.988 5 19.806 5 19s.55-.988 1.012-1H21V4c0-1.103-.897-2-2-2zm0 14H5V5c0-.806.55-.988 1-1h13v12z"></path>
        </svg>
      )}
    </LikeBtnWrapper>
  );
}

const LikeBtnWrapper = styled.button`
  border: none;
`;

export default LikeBtnBook;
