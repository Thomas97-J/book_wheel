import styled from "styled-components";
import Header from "../../../../assets/styles/Header";

function DealHeader() {
  return <DefaultHeaderWrapper>내 교환</DefaultHeaderWrapper>;
}
const DefaultHeaderWrapper = styled(Header)`
  padding: 0 20px;
  border: none;
  box-shadow: none;
`;

export default DealHeader;
