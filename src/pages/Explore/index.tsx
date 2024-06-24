import { collection, doc, getDocs, query } from "firebase/firestore";
import React, { useEffect } from "react";
import styled from "styled-components";
import { db } from "../../firebase";
import { useQuery } from "@tanstack/react-query";
import UserCard from "./UserCard";

export interface UserData {
  id: string;
  nickname?: string;
  profileImage?: string;
}

async function fetchUserData(): Promise<UserData[]> {
  const userSnapshot = await getDocs(collection(db, "users"));
  return userSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

function Explore() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users_all"],
    queryFn: fetchUserData,
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
