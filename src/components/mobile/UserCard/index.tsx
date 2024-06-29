import React from "react";
import styled from "styled-components";
import imgPaths from "../../../assets/images/image_path";
import { Link } from "react-router-dom";
import FollowBtn from "../FollowBtn";
import { useAuth } from "../../../context/AuthContext";

function UserCard({ userInfo }: { userInfo: UserData }) {
  const { currentUser } = useAuth();
  return (
    <UserCardWrapper>
      <GoToProfile to={`/profile?user=${userInfo.nickname}`}>
        <ProFile
          src={userInfo?.profileImage || imgPaths.defaultProfileImage}
          alt=""
        />
        <Nickname>{userInfo.nickname}</Nickname>
      </GoToProfile>
      <FollowBtnWrapper>
        <FollowBtn
          currentUid={currentUser?.uid ?? ""}
          targetUid={userInfo.id}
        />
      </FollowBtnWrapper>
    </UserCardWrapper>
  );
}

const UserCardWrapper = styled.div`
  display: flex;
  padding: 10px 0;
`;
const GoToProfile = styled(Link)`
  position: relative;
  display: flex;
  text-decoration: none;
  color: #000;
`;

const Nickname = styled.div`
  margin-left: 10px;
`;
const ProFile = styled.img`
  width: 60px;
  height: 60px;
`;
const FollowBtnWrapper = styled.div`
  position: absolute;
  right: 10px;
`;
export default UserCard;
