import styled from "styled-components";

const PageWrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 60px 0 100px;
  position: relative;
  max-width: 600px;

  @media (min-width: 600px) {
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
  }
`;
export default PageWrapper;
