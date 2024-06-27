import { useEffect, useState } from "react";
import Mainheaders from "../../components/mobile/headers/MainHeader";
import { useAuth } from "../../context/AuthContext";

import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { PATH } from "../../App";
import PostSection from "./PostSection";

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
      <Banner>배너 색션</Banner>
      <PostSection />
      <NewPostButton to={PATH.postEdit}>새 글 쓰기</NewPostButton>
    </MainWrapper>
  );
}
const Banner = styled.div`
  min-height: 200px;
  width: 100%;
  border: solid 1px;
`;

const NewPostButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 80px;
  right: 20px;
  z-index: 10;

  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 10%;
  width: 80px;
  height: 40px;
  font-size: 14px;
  white-space: nowrap;
  text-decoration: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const MainWrapper = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px 10px 60px;
  position: relative;
`;

export default Main;
