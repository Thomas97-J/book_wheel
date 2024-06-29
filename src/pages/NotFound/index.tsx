import React from "react";
import { Link } from "react-router-dom";
import { PATH } from "../../App";

import styled from "styled-components";
import PageWrapper from "../../assets/styles/PageWrapper";

function NotFound() {
  return (
    <NotFoundWrapper>
      404 ERROR 페이지를 찾을 수 없습니다
      <Link to={PATH.main}>홈으로</Link>
    </NotFoundWrapper>
  );
}
const NotFoundWrapper = styled(PageWrapper)``;

export default NotFound;
