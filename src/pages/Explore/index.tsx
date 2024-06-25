import React, { useEffect } from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import UserCard from "./UserCard";
import { getAllUsers } from "../../apis/users";

function Explore() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users_all"],
    queryFn: getAllUsers,
  });

  useEffect(() => {
    console.log("explore", data);
  }, [data]);

  if (isLoading) return <span>Loading...</span>;
  if (isError) return <span>Error: {error.message}</span>;

  return (
    <ExploreWrapper>
      {data && data?.map((user) => <UserCard key={user.id} userInfo={user} />)}
    </ExploreWrapper>
  );
}
const ExploreWrapper = styled.div`
  display: flex;
  width: 100vw;
  flex-direction: column;
  justify-content: center;
`;

export default Explore;
