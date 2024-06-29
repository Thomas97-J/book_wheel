import Mainheaders from "../../components/mobile/headers/MainHeader";

import { Link } from "react-router-dom";
import styled from "styled-components";
import { PATH } from "../../App";
import PostSection from "./PostSection";
import PageWrapper from "../../assets/styles/PageWrapper";

function Main() {
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

const MainWrapper = styled(PageWrapper)``;

export default Main;
