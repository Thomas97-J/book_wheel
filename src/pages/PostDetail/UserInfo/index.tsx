import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../../../apis/users";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { PATH } from "../../../App";
import imgPaths from "../../../assets/images/image_path";

function UserInfo({ uid }: { uid: string }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["user_profile_post", uid],
    queryFn: () => getUserById(uid),
  });

  return (
    <UserInfoWrapper>
      <ProFile
        src={data?.profileImage || imgPaths.defaultProfileImage}
        alt="profile"
      />
      <NameSection to={`${PATH.profile}?user=${data?.nickname}`}>
        <NickName>{data?.nickname}</NickName>
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
