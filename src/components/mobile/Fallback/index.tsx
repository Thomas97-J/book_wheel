import React from "react";
import { BeatLoader } from "react-spinners";
import styled from "styled-components";

function Fallback() {
  return (
    <FallbackWrapper>
      <BeatLoader />
    </FallbackWrapper>
  );
}
const FallbackWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: white;
`;

export default Fallback;
