import { useEffect, useState } from "react";
import Mainheaders from "../../components/mobile/headers/Mainheaders";
import { useAuth } from "../../context/AuthContext";
import { auth } from "../../firebase";

import { Link } from "react-router-dom";
import styled from "styled-components";

function Main() {
  const { currentUser, isLoading } = useAuth();
  const [user, setUser] = useState(currentUser);
  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);
  return (
    <MainWrapper>
      <Mainheaders />
      <Link to="/signup">회원가입</Link>
      <Link to="/my">마이페이지</Link>
      <h2>User Profile</h2>
      <p>Email: {user?.email}</p>
      <p>UID: {user?.uid}</p>
      <button onClick={() => auth.signOut()}>Sign Out</button>
    </MainWrapper>
  );
}
const MainWrapper = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default Main;
