import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../../context/AuthContext";
import { Link } from "react-router-dom";
import { PATH } from "../../../App";
import { useQuery } from "@tanstack/react-query";
import imgPaths from "../../../assets/images/image_path";
import { getUserById } from "../../../apis/users";

function ProfileAndInfo() {
  const { currentUser } = useAuth();
  const uid = currentUser?.uid ?? "";

  const { data, isLoading, error } = useQuery({
    queryKey: ["user_profile", uid],
    queryFn: () => getUserById(uid),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <UserInfo>
      <ProFile
        src={data?.profileImage || imgPaths.defaultProfileImage}
        alt="profile"
      />
      <NameAndBio>
        <NameSection>
          <NickName>{data?.nickname}</NickName>
          <Link to={`${PATH.profile}?user=${data?.nickname}`}>프로필 보기</Link>
        </NameSection>
        <Biography>{data?.bio}</Biography>
        <GoToFixLink to={PATH.infoFix}>정보 수정</GoToFixLink>
      </NameAndBio>
    </UserInfo>
  );
}

const ProFile = styled.img`
  width: 100px;
  height: 100px;
`;
const NameAndBio = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
`;
const NameSection = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 4px;
`;
const NickName = styled.span`
  margin-right: 10px;
`;
const Biography = styled.div`
  padding: 4px;
`;
const GoToFixLink = styled(Link)`
  width: 140px;
  font-size: 14px;
  border: 1px solid black;
`;
const UserInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export default ProfileAndInfo;
