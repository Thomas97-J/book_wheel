import styled from "styled-components";
import formatRelativeTime from "../../../../utils/formatRelativeTime";

function MyMessage({ message }: { message: Message }) {
  const formattedDate = formatRelativeTime(message?.createdAt as Timestamp);
  return (
    <MyMessageWrapper key={message.id}>
      <Date>{formattedDate}</Date>
      <Content>{message.text}</Content>
    </MyMessageWrapper>
  );
}
const Nickname = styled.strong`
  white-space: nowrap;
`;
const Content = styled.span`
  max-width: 70vw;
`;
const MyMessageWrapper = styled.div`
  width: 100%;
  min-height: 24px;

  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 6px;
`;
const Date = styled.div`
  font-size: 0.8rem;
  color: #666;
  margin-right: 10px;
`;

export default MyMessage;
