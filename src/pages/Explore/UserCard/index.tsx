import React from "react";
import styled from "styled-components";
import { UserData } from "..";
import imgPaths from "../../../assets/images/image_path";
import { Link } from "react-router-dom";

const UserCardWrapper = styled.div`
  display: flex;
  padding: 10px;
`;
const Nickname = styled.div``;
const ProFile = styled.img`
  width: 100px;
  height: 100px;
`;
function UserCard({ userInfo }: { userInfo: UserData }) {
  return (
    <UserCardWrapper>
      <ProFile
        src={userInfo?.profileImage || imgPaths.defaultProfileImage}
        alt=""
      />
      <Link to={`/profile?user=${userInfo.nickname}`}>
        <Nickname>{userInfo.nickname}</Nickname>
      </Link>
    </UserCardWrapper>
  );
}

export default UserCard;