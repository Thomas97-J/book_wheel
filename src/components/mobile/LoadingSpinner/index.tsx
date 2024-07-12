import { ClipLoader } from "react-spinners";
import styled from "styled-components";

function LoadingSpinner() {
  return (
    <LodingSpinnerWrapper>
      <ClipLoader />
    </LodingSpinnerWrapper>
  );
}
const LodingSpinnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
`;

export default LoadingSpinner;
