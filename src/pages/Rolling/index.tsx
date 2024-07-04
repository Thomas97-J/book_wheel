import styled from "styled-components";
import PageWrapper from "../../assets/styles/PageWrapper";
import DefaultHeader from "../../components/mobile/headers/DefaultHeader";

function Rolling() {
  return (
    <RollingWrapper>
      <DefaultHeader />
      롤링 페이지
    </RollingWrapper>
  );
}
const RollingWrapper = styled(PageWrapper)`
  /* Add your styles here */
`;

export default Rolling;
