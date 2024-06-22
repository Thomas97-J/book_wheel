import React from "react";
import styled from "styled-components";
import ProfileAndInfo from "./ProfileAndInfo";

function My() {
  return (
    <MyWrapper>
      <ProfileAndInfo />
      <DummySection>작성 글 목록</DummySection>
      <DummySection>관심 도서</DummySection>
      <DummySection>내 서재</DummySection>
    </MyWrapper>
  );
}

const DummySection = styled.div`
  height: 100px;
  width: 100%;
  border: 1px solid black;
  margin: 10px;
`;

const MyWrapper = styled.div`
  width: 100%;
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export default My;
