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
      {followingId ? "unfollow" : "follow"}
    </FollowBtnWrapper>
  );
}
const FollowBtnWrapper = styled.button<{ $isFollow: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  width: 70px;
  height: 30px;
  border: solid 1px;
  border-radius: 6px;
  ${(props) => (props.$isFollow ? "color: #ccc;   border-color: #ccc;" : "")}
`;

export default FollowBtn;
