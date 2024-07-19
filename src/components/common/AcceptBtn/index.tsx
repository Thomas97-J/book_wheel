import styled from "styled-components";

const AcceptBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
  margin: 0 6px;

  height: 30px;
  border: solid 1px;
  border-radius: 6px;
  color: #fff;
  background-color: ${({ theme }) => theme.color.default_green};
  border-color: initial;
  &:disabled {
    color: #fff;
    background-color: ${({ theme }) => theme.color.default_green};
    opacity: 0.7;
  }
`;

export default AcceptBtn;
