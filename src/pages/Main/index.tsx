import Mainheaders from "../../components/mobile/headers/MainHeader";

import { Link } from "react-router-dom";
import styled from "styled-components";
import { PATH } from "../../App";
import PostSection from "./PostSection";
import PageWrapper from "../../assets/styles/PageWrapper";
import { useInView } from "react-intersection-observer";
import { Helmet } from "react-helmet-async";

function Main() {
  const { ref: topRef, inView: needBottomLine } = useInView({
    threshold: 1,
  });

  return (
    <MainWrapper>
      <Helmet>
        <title>책바퀴 - 게시글</title>
      </Helmet>
      <Mainheaders needBottomLine={needBottomLine} />
      <Banner>배너 색션</Banner>
      <PostSection topRef={topRef} needBottomLine={needBottomLine} />
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

  background: ${({ theme }) => theme.color.default_green};
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

const MainWrapper = styled(PageWrapper)`
  padding: 60px 0;
`;

export default Main;
