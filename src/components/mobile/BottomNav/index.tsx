import React from "react";
import styled from "styled-components";
import { PATH } from "../../../App";
import { Link } from "react-router-dom";

function BottomNav() {
  return (
    <BottomNavWrapper>
      <Link to={PATH.main}>메인</Link>
      <Link to={PATH.explore}>탐험</Link>
      <Link to={PATH.main}>메인</Link>
      <Link to={PATH.my}>마이</Link>
    </BottomNavWrapper>
  );
}
const BottomNavWrapper = styled.div`
  width: 100vw;
  padding: 10px;
  display: flex;
  justify-content: space-around;
  position: fixed;
  bottom: 0;
  background-color: white;
`;

export default BottomNav;
