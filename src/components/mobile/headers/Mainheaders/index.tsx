import React from "react";

import styled from "styled-components";
import { useAuth } from "../../../../context/AuthContext";
import { PATH } from "../../../../App";
import { useNavigate } from "react-router-dom";

const MainheadersWrapper = styled.header`
  height: 60px;
  border-bottom: solid 1px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0;
  button {
    width: 100px;
    margin: 10px;
    white-space: nowrap;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

function Mainheaders() {
  const { currentUser, isLoading, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <MainheadersWrapper>
      <button>지역 선택</button>
      {currentUser?.uid ? (
        <button
          onClick={async () => {
            await logout();
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
    </MainheadersWrapper>
  );
}

export default Mainheaders;
