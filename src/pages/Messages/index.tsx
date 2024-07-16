import styled from "styled-components";
import PageWrapper from "../../assets/styles/PageWrapper";
import { useAuth } from "../../context/AuthContext";
import ChatRoomCard from "./ChatRoomCard";
import { useUserChatRooms } from "../../hooks/message/useUserChatRooms";
import MessageMainHeader from "../../components/mobile/headers/MessageMainHeader";
import ListEmpty from "../../components/mobile/ListEmpty";

function Messages() {
  const { currentUser } = useAuth();
  const userId = currentUser?.uid ?? "";
  const { chatRooms, isLoading, error } = useUserChatRooms(userId);
  const isEmpty = chatRooms?.length === 0 && !isLoading;
  return (
    <MessagesWrapper>
      <MessageMainHeader />
      <MessageBody>
        {isEmpty ? (
          <ListEmpty>첫 대화를 시작해주세요!</ListEmpty>
        ) : (
          chatRooms?.map((room) => <ChatRoomCard key={room.id} room={room} />)
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
`;
export default Messages;
