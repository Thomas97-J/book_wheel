import styled from "styled-components";

const RejectBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
  margin: 0 6px;

  height: 30px;
  border: solid 1px;
  border-radius: 6px;
  color: #666;
  background-color: ${({ theme }) => theme.color.default_gray_green};
  border-color: initial;
  &:disabled {
    color: #666;
    background-color: ${({ theme }) => theme.color.default_gray_green};
    opacity: 0.7;
  }
`;

export default RejectBtn;
