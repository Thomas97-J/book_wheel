import React, { useEffect } from "react";
import styled from "styled-components";
import { db } from "../../firebase";
import { collection, getDocs, query } from "firebase/firestore";
import { useAuth } from "../../components/AuthContext";

function My() {
  const { currentUser, isLoading } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "users"));
      const querySnapshot = await getDocs(q);
      console.log("querySnapshot", querySnapshot);
    };
    fetchData();
    console.log(currentUser);
  }, []);
  return <MyWrapper>마이페이지</MyWrapper>;
}

const MyWrapper = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export default My;
