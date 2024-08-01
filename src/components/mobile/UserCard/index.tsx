import styled from "styled-components";
import { Link } from "react-router-dom";
import FollowBtn from "../FollowBtn";
import { useAuth } from "../../../context/AuthContext";
import ProfileImageSmall from "../../common/ProfileImageSmall";
import React from "react";

function UserCard({ userInfo }: { userInfo: UserData }) {
  const { currentUser } = useAuth();
  console.log("userInfo", userInfo);

  return (
    <UserCardWrapper>
      <GoToProfile to={`/profile?user=${userInfo.nickname}`}>
        <ProfileImageSmall src={userInfo?.profileImage} />
        <NicknameAndBio>
          <Nickname>{userInfo.nickname}</Nickname>
          <Biography>{userInfo?.bio}</Biography>
        </NicknameAndBio>
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
  height: 68;
  padding: 4px 0;
  width: 100%;
`;
const GoToProfile = styled(Link)`
  position: relative;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #000;
  flex: 1;
  img {
    width: 60px;
    height: 60px;
  }
`;
const Biography = styled.div`
  width: 70%;
  font-size: 14px;
  color: #737373;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const Nickname = styled.strong`
  font-weight: bold;
  margin-bottom: 8px;
`;
const NicknameAndBio = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const FollowBtnWrapper = styled.div``;
export default React.memo(UserCard);
