import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../context/AuthContext";
import ProfileAndInfo from "../../components/mobile/ProfileAndInfo";
import useGetUidByNickname from "../../hooks/users/useGetUidByNickname";
import PageWrapper from "../../assets/styles/PageWrapper";
import FollowBtn from "../../components/mobile/FollowBtn";

function Profile() {
  const { currentUser } = useAuth();
  const [query, setQuery] = useSearchParams();
  const nickname = query.get("user") ?? "";
  const { targetUid } = useGetUidByNickname(nickname);

  return (
    <ProfileWrapper>
      <ProfileAndInfo uid={targetUid || ""} />
      <FollowBtnWrapper>
        <FollowBtn
          currentUid={currentUser?.uid ?? ""}
          targetUid={targetUid ?? ""}
        />
      </FollowBtnWrapper>
    </ProfileWrapper>
  );
}

const ProfileWrapper = styled(PageWrapper)``;
const FollowBtnWrapper = styled.div`
  position: absolute;
  right: 10px;
`;
export default Profile;
