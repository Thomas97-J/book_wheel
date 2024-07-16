import { BeatLoader } from "react-spinners";
import styled from "styled-components";
import PageWrapper from "../../../assets/styles/PageWrapper";

function Fallback() {
  return (
    <FallbackWrapper>
      <BeatLoader color={"rgb(74 131 50)"} />
    </FallbackWrapper>
  );
}
const FallbackWrapper = styled(PageWrapper)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: white;
`;

export default Fallback;
