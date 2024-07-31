import styled from "styled-components";
import PageWrapper from "../../assets/styles/PageWrapper";
import { useAuth } from "../../context/AuthContext";
import ChatRoomCard from "./ChatRoomCard";
import { useUserChatRooms } from "../../hooks/message/useUserChatRooms";
import MessageMainHeader from "../../components/mobile/headers/MessageMainHeader";
import ListEmpty from "../../components/mobile/ListEmpty";
import { Helmet } from "react-helmet-async";
import ErrorBoundary from "../../HOCs/ErrorBoundary";

function Messages() {
  const { currentUser } = useAuth();
  const userId = currentUser?.uid ?? "";
  const { chatRooms, isLoading, error } = useUserChatRooms(userId);
  const isEmpty = chatRooms?.length === 0 && !isLoading;
  return (
    <MessagesWrapper>
      <Helmet>
        <title>책바퀴 - 메시지</title>
      </Helmet>
      <MessageMainHeader />
      <MessageBody>
        {isEmpty ? (
          <ListEmpty>첫 대화를 시작해주세요!</ListEmpty>
        ) : (
          chatRooms?.map((room) => (
            <ErrorBoundary>
              <ChatRoomCard key={room.id} room={room} />
            </ErrorBoundary>
          ))
        )}
      </MessageBody>
    </MessagesWrapper>
  );
}
const MessagesWrapper = styled(PageWrapper)`
  /* Add your styles here */
`;
const MessageBody = styled.div`
  padding: 0 10px;
  display: flex;
  flex-direction: column;
`;
export default Messages;
