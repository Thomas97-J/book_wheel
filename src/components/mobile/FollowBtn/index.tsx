import useCheckIsFollowing from "../../../hooks/follow/useCheckIsFollowing";
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
  const { followingId } = useCheckIsFollowing(currentUid, targetUid);
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
    >
      {followingId ? "unfollow" : "follow"}
    </FollowBtnWrapper>
  );
}
const FollowBtnWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  width: 80px;
  height: 30px;
  border: solid 1px;
`;

export default FollowBtn;
