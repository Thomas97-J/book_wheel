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
      <Banner>배너 색션</Banner>
      <CommunityBoard>게시글 섹션</CommunityBoard>
      <NewPostButton to={PATH.newPost}>새 글 쓰기</NewPostButton>
    </MainWrapper>
  );
}
const Banner = styled.div`
  height: 200px;
  width: 100%;
  border: solid 1px;
`;

const CommunityBoard = styled.div`
  height: 100%;
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
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px 10px 60px;
  position: relative;
`;

export default Main;
