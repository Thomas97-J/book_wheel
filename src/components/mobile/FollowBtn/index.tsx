import useGetFollowId from "../../../hooks/follow/useGetFollowId";
import useCreateFollow from "../../../hooks/follow/useCreateFollow";
import useDeleteFollow from "../../../hooks/follow/useDeleteFollow";

import styled from "styled-components";

function FollowBtn({
  currentUid,
  targetUid,
}: {
  currentUid: string;
  targetUid: string;
}) {
  const { followingId } = useGetFollowId(currentUid, targetUid);
  const followMutation = useCreateFollow(currentUid, targetUid);
  const unFollowMutation = useDeleteFollow(currentUid, targetUid);
  if (currentUid === targetUid) {
    return "";
  }
  return (
    <FollowBtnWrapper
      onClick={async () => {
        if (followingId) {
          await unFollowMutation.mutateAsync(followingId);
        } else {
          if (currentUid && targetUid)
            await followMutation.mutateAsync({
              from_userId: currentUid,
              to_userId: targetUid,
            });
        }
      }}
      $isFollow={!!followingId}
    >
      {followingId ? "팔로잉" : "팔로우"}
    </FollowBtnWrapper>
  );
}
const FollowBtnWrapper = styled.button<{ $isFollow: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  margin-left: 8px;
  width: 52px;
  height: 24px;
  border: solid 1px;
  border-radius: 4px;
  font-size: 13px;
  color: ${({ $isFollow }) => ($isFollow ? "#ccc" : "#fff")};
  background-color: ${({ $isFollow, theme }) =>
    $isFollow ? theme.color.default_gray_green : theme.color.default_green};
  border-color: ${({ $isFollow }) => ($isFollow ? "#ccc" : "initial")};
`;

export default FollowBtn;
