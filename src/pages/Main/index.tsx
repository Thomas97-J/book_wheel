import { useEffect, useState } from "react";
import Mainheaders from "../../components/mobile/headers/Mainheaders";
import { useAuth } from "../../context/AuthContext";

import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { PATH } from "../../App";

function Main() {
  const { currentUser, isLoading, logout } = useAuth();
  const [user, setUser] = useState(currentUser);
  const navigate = useNavigate();

  useEffect(() => {
    setUser(currentUser);
    console.log("currentUser", currentUser);
  }, [currentUser]);

  useEffect(() => {
    console.log(isLoading);
  }, [isLoading]);

  return (
    <MainWrapper>
      <Mainheaders />
      <Link to="/signup">회원가입</Link>
      <Link to="/my">마이페이지</Link>
      <h2>User Profile</h2>
      <p>Email: {user?.email}</p>
      <p>UID: {user?.uid}</p>
      {user?.uid ? (
        <button
          onClick={() => {
            logout();
          }}
        >
          Sign Out
        </button>
      ) : (
        <button
          onClick={() => {
            navigate(PATH.signIn);
          }}
        >
          Sign In
        </button>
      )}
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
