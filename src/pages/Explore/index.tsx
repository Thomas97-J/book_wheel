import { collection, doc, getDocs, query } from "firebase/firestore";
import React, { useEffect } from "react";
import styled from "styled-components";
import { db } from "../../firebase";
import { useQuery } from "@tanstack/react-query";

interface UserData {
  id: string;
  nickname?: string;
}

async function fetchUserData(): Promise<UserData[]> {
  const userSnapshot = await getDocs(collection(db, "users"));
  return userSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

function Explore() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUserData,
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (isLoading) return <span>Loading...</span>;
  if (isError) return <span>Error: {error.message}</span>;

  return (
    <ExploreWrapper>
      {data?.map((user) => (
        <UserCard key={user.id}>{user.nickname}</UserCard>
      ))}
    </ExploreWrapper>
  );
}
const UserCard = styled.div``;
const ExploreWrapper = styled.div`
  /* Add your styles here */
`;

export default Explore;
