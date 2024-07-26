import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../context/AuthContext";
import ProfileAndInfo from "../../components/mobile/ProfileAndInfo";
import useGetUidByNickname from "../../hooks/users/useGetUidByNickname";
import PageWrapper from "../../assets/styles/PageWrapper";
import FollowBtn from "../../components/mobile/FollowBtn";
import DefaultHeader from "../../components/mobile/headers/DefaultHeader";
import ProfileHeader from "../../components/mobile/headers/ProfileHeader";

function Profile() {
  const { currentUser } = useAuth();
  const [query, setQuery] = useSearchParams();
  const nickname = query.get("user") ?? "";
  const { targetUid } = useGetUidByNickname(nickname);

  return (
    <ProfileWrapper>
      <ProfileHeader />
      <ProfileBody>
        <ProfileAndInfo uid={targetUid || ""} nickname={nickname} />
      </ProfileBody>{" "}
    </ProfileWrapper>
  );
}

const ProfileWrapper = styled(PageWrapper)`
  position: relative;
  padding-top: 0;
`;
const ProfileBody = styled.div`
  padding: 0;
`;

export default Profile;
