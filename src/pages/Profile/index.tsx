import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import imgPaths from "../../assets/images/image_path";
import useGetUserByNickname from "../../hooks/users/useGetUserByNickname";

function Profile() {
  const [query, setQuery] = useSearchParams();
  const nickname = query.get("user") ?? "";

  const { userData, isLoading, isError, error } =
    useGetUserByNickname(nickname);

  return (
    <ProfileWrapper>
      <ProFile
        src={userData?.profileImage || imgPaths.defaultProfileImage}
        alt="profile"
      />
      <InfoSection>
        <div>{userData?.nickname}</div>
        <div>{userData?.bio}</div>
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
