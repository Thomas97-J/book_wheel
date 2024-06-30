import React from "react";
import styled from "styled-components";
import { PATH } from "../../../App";
import { Link } from "react-router-dom";

function BottomNav() {
  return (
    <BottomNavWrapper>
      <Link to={PATH.main}>메인</Link>
      <Link to={PATH.rolling}>롤링</Link>
      <Link to={PATH.messages}>메시지</Link>
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
  box-shadow: 0px -2px 3px 0px rgba(0, 0, 0, 0.1);
`;

export default BottomNav;
