import styled from "styled-components";

const Header = styled.header`
  height: 60px;
  border-bottom: solid 1px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fff;
  z-index: 1000;
`;

export default Header;
