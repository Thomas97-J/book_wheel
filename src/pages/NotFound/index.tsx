import { Link } from "react-router-dom";
import { PATH } from "../../App";

import styled from "styled-components";
import PageWrapper from "../../assets/styles/PageWrapper";
import DefaultHeader from "../../components/mobile/headers/DefaultHeader";
import imgPaths from "../../assets/images/image_path";

function NotFound() {
  return (
    <NotFoundWrapper>
      <DefaultHeader />
      <img src={imgPaths.hamsterWithBook} />
      404 ERROR 페이지를 찾을 수 없습니다
      <GoToHome to={PATH.main}>홈으로</GoToHome>
    </NotFoundWrapper>
  );
}
const NotFoundWrapper = styled(PageWrapper)`
  padding-top: 100px;
  align-items: center;
  img {
    width: 200px;
  }
`;
const GoToHome = styled(Link)`
  margin-top: 20px;
  text-decoration: none;
  color: #000;
`;
export default NotFound;
