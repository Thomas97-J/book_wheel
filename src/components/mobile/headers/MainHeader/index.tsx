import React from "react";

import styled from "styled-components";
import { useAuth } from "../../../../context/AuthContext";
import { PATH } from "../../../../App";
import { useNavigate } from "react-router-dom";
import DropDown from "../../../common/DropDown";

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
  const dropDownOptions = [
    {
      label: "지역1",
      clickFunction: () => {
        console.log("지역1 클릭");
      },
    },
    {
      label: "지역2",
      clickFunction: () => {
        console.log("지역2 클릭");
      },
    },
  ];
  return (
    <MainheadersWrapper>
      <DropDown options={dropDownOptions} buttonInner={"지역 선택"} />
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
