import styled from "styled-components";
import useCreatePostLike from "../../../hooks/like/useCreatePostLike";
import useDeletePostLike from "../../../hooks/like/useDeletePostLike";
import useGetPostLikeId from "../../../hooks/like/useGetPostLikeId";
import { useMemo } from "react";
import _ from "lodash";

function LikeBtn({ userId, postId }: { userId: string; postId: string }) {
  const { likeId } = useGetPostLikeId(userId, postId);
  const likeMutation = useCreatePostLike(userId, postId);
  const unLikeMutation = useDeletePostLike(userId, postId);
  async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    console.log("likeId", likeId);
    e.stopPropagation();
    if (likeId) {
      await unLikeMutation.mutateAsync(likeId);
    } else {
      if (userId && postId) {
        await likeMutation.mutateAsync({ userId: userId, postId: postId });
      }
    }
  }

  const debouncedClick = useMemo(
    () => _.debounce(handleClick, 100),
    [likeId, userId, postId]
  );

  return (
    <LikeBtnWrapper onClick={debouncedClick}>
      {likeId ? "liked" : "like"}
    </LikeBtnWrapper>
  );
}
const LikeBtnWrapper = styled.button`
  width: 70px;
`;
export default LikeBtn;
