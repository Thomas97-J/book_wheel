import styled from "styled-components";
import PageWrapper from "../../assets/styles/PageWrapper";
import DefaultHeader from "../../components/mobile/headers/DefaultHeader";

function Messages() {
  return (
    <MessagesWrapper>
      <DefaultHeader />
      메시지
    </MessagesWrapper>
  );
}
const MessagesWrapper = styled(PageWrapper)`
  /* Add your styles here */
`;

export default Messages;
