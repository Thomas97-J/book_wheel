import styled from "styled-components";
import { Link } from "react-router-dom";
import { PATH } from "../../../App";
import imgPaths from "../../../assets/images/image_path";
import useGetUserById from "../../../hooks/users/useGetUserById";

function UserInfo({ uid }: { uid: string }) {
  const { userData, isLoading, error } = useGetUserById(uid);
  return (
    <UserInfoWrapper>
      <ProFile
        src={userData?.profileImage || imgPaths.defaultProfileImage}
        alt="profile"
      />
      <NameSection to={`${PATH.profile}?user=${userData?.nickname}`}>
        <NickName>{userData?.nickname}</NickName>
      </NameSection>
    </UserInfoWrapper>
  );
}
const UserInfoWrapper = styled.div`
  display: flex;
`;

const ProFile = styled.img`
  width: 100px;
  height: 100px;
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
