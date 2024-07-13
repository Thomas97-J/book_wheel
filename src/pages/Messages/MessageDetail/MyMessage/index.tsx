import styled from "styled-components";
import formatRelativeTime from "../../../../utils/formatRelativeTime";
import { theme } from "../../../../assets/styles/styled";

function MyMessage({ message }: { message: Message }) {
  const formattedDate = formatRelativeTime(message?.createdAt as Timestamp);
  return (
    <MyMessageWrapper key={message.id}>
      <Date>{formattedDate}</Date>
      <Content>{message.text}</Content>
    </MyMessageWrapper>
  );
}

const Content = styled.span`
  background-color: ${({ theme }) => theme.color.default_green};
  color: #fff;
  padding: 4px 8px;
  border-radius: 10px;
  max-width: 70vw;
  line-height: 1.4;
`;
const MyMessageWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  min-height: 24px;

  align-items: flex-end;
  margin-bottom: 6px;
`;
const Date = styled.div`
  font-size: 0.7rem;
  color: #666;
  margin-right: 6px;
  margin-bottom: 4px;
`;

export default MyMessage;
