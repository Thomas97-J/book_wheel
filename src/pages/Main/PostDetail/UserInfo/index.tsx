import styled from "styled-components";
import { Link } from "react-router-dom";
import { PATH } from "../../../App";
import useGetUserById from "../../../hooks/users/useGetUserById";
import ProfileImage from "../../../components/common/ProfileImage";

function UserInfo({ uid }: { uid: string }) {
  const { userData, isLoading, error } = useGetUserById(uid);
  return (
    <UserInfoWrapper>
      <ProfileImage src={userData?.profileImage} />
      <NameSection to={`${PATH.profile}?user=${userData?.nickname}`}>
        <NickName>{userData?.nickname}</NickName>
      </NameSection>
    </UserInfoWrapper>
  );
}
const UserInfoWrapper = styled.div`
  display: flex;
`;

const NameSection = styled(Link)`
  display: flex;
  justify-content: space-between;
  padding: 4px;
`;
const NickName = styled.span`
  margin-right: 10px;
`;

export default UserInfo;
