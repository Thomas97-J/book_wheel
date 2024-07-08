import React from "react";
import styled from "styled-components";
import imgPaths from "../../../assets/images/image_path";
import { Link } from "react-router-dom";
import FollowBtn from "../FollowBtn";
import { useAuth } from "../../../context/AuthContext";
import ProfileImage from "../../common/ProfileImage";

function UserCard({ userInfo }: { userInfo: UserData }) {
  const { currentUser } = useAuth();
  return (
    <UserCardWrapper>
      <GoToProfile to={`/profile?user=${userInfo.nickname}`}>
        <ProfileImage src={userInfo?.profileImage} />
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

const FollowBtnWrapper = styled.div`
  position: absolute;
  right: 10px;
`;
export default UserCard;
