import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import imgPaths from "../../assets/images/image_path";
import { getUserByNickname } from "../../apis/users";

function Profile() {
  const [query, setQuery] = useSearchParams();
  const nickname = query.get("user") ?? "";
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUserByNickname(nickname),
  });

  useEffect(() => {
    console.log("Debug:data", data);
  }, [data]);
  useEffect(() => {
    return () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    };
  }, []);
  return (
    <ProfileWrapper>
      <ProFile
        src={data?.profileImage || imgPaths.defaultProfileImage}
        alt="profile"
      />
      <InfoSection>
        <div>{data?.nickname}</div>
        <div>{data?.bio}</div>
      </InfoSection>
    </ProfileWrapper>
  );
}
const ProFile = styled.img`
  width: 100px;
  height: 100px;
`;
const InfoSection = styled.section`
  display: flex;
  flex-direction: column;

  justify-content: center;
`;
const ProfileWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export default Profile;
