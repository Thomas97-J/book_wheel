import styled from "styled-components";

function MyMessage({ message }: { message: Message }) {
  return (
    <MyMessageWrapper key={message.id}>
      <Nickname>{message.userName}</Nickname>: <Content>{message.text}</Content>
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
  min-height: 30px;
  display: flex;
  margin-bottom: 4px;

  justify-content: flex-end;
`;
export default MyMessage;
