import styled from "styled-components";

const Header = styled.header`
  height: 50px;
  width: 100%;
  max-width: 600px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  /* left: 0; */
  background-color: #fff;
  z-index: 1000;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

export default Header;
