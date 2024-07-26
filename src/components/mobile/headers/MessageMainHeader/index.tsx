import styled from "styled-components";
import Header from "../../../../assets/styles/Header";
import { useNavigate } from "react-router-dom";

function MessageMainHeader() {
  const navigate = useNavigate();

  return <MessageMainHeaderWrapper>메시지</MessageMainHeaderWrapper>;
}
const MessageMainHeaderWrapper = styled(Header)`
  padding: 0 20px;
  font-weight: bold;
`;

export default MessageMainHeader;
