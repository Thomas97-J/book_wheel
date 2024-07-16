import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../context/AuthContext";
import ProfileAndInfo from "../../components/mobile/ProfileAndInfo";
import useGetUidByNickname from "../../hooks/users/useGetUidByNickname";
import PageWrapper from "../../assets/styles/PageWrapper";
import FollowBtn from "../../components/mobile/FollowBtn";
import DefaultHeader from "../../components/mobile/headers/DefaultHeader";

function Profile() {
  const { currentUser } = useAuth();
  const [query, setQuery] = useSearchParams();
  const nickname = query.get("user") ?? "";
  const { targetUid } = useGetUidByNickname(nickname);

  return (
    <ProfileWrapper>
      <DefaultHeader />
      <ProfileBody>
        <ProfileAndInfo uid={targetUid || ""} nickname={nickname} />
      </ProfileBody>{" "}
    </ProfileWrapper>
  );
}

const ProfileWrapper = styled(PageWrapper)`
  position: relative;
`;
const ProfileBody = styled.div`
  padding: 0 10px;
`;
const FollowBtnWrapper = styled.div`
  position: absolute;
  top: 122px;
  right: 10px;
`;
export default Profile;
