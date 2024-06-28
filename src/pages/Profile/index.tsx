import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import imgPaths from "../../assets/images/image_path";
import useGetUserByNickname from "../../hooks/users/useGetUserByNickname";
import useCreateFollow from "../../hooks/users/useCreateFollow";
import { useAuth } from "../../context/AuthContext";
import useCheckIsFollowing from "../../hooks/users/useCheckIsFollowing";
import useDeleteFollow from "../../hooks/users/useDeleteFollow";

function Profile() {
  const { currentUser } = useAuth();
  const [query, setQuery] = useSearchParams();
  const nickname = query.get("user") ?? "";
  const { userData, isLoading, isError, error } =
    useGetUserByNickname(nickname);

  const { followingId } = useCheckIsFollowing(
    currentUser?.uid || "",
    userData?.uid || ""
  );

  const followMutation = useCreateFollow();
  const unFollowMutation = useDeleteFollow(
    currentUser?.uid || "",
    userData?.uid || ""
  );
  return (
    <ProfileWrapper>
      <ProFile
        src={userData?.profileImage || imgPaths.defaultProfileImage}
        alt="profile"
      />
      <InfoSection>
        <div>{userData?.nickname}</div>
        <div>{userData?.bio}</div>
        <button
          onClick={async () => {
            if (followingId) {
              await unFollowMutation.mutateAsync(followingId);
            } else {
              if (currentUser?.uid && userData?.uid)
                await followMutation.mutateAsync({
                  from_userId: currentUser?.uid,
                  to_userId: userData?.uid,
                });
            }
          }}
        >
          {followingId ? "unfollow" : "follow"}
        </button>
      </InfoSection>
    </ProfileWrapper>
  );
}
const ProFile = styled.img`
  width: 100px;
  height: 100px;
`;
const InfoSection = styled.section`
  display: flex;
  flex-direction: column;

  justify-content: center;
`;
const ProfileWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export default Profile;
