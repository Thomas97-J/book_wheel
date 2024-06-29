import styled from "styled-components";
import ProfileAndInfo from "../../components/mobile/ProfileAndInfo";
import MypageHeader from "../../components/mobile/headers/MypageHeader";
import { useAuth } from "../../context/AuthContext";
import PageWrapper from "../../assets/styles/PageWrapper";

function My() {
  const { currentUser } = useAuth();
  const uid = currentUser?.uid ?? "";

  return (
    <MyWrapper>
      <MypageHeader />
      <ProfileAndInfo uid={uid} />
      <DummySection>작성 글 목록</DummySection>
      <DummySection>관심 도서</DummySection>
      <DummySection>내 서재</DummySection>
    </MyWrapper>
  );
}

const DummySection = styled.div`
  height: 100px;
  border: 1px solid black;
  margin-bottom: 10px;
`;

const MyWrapper = styled(PageWrapper)``;
export default My;
