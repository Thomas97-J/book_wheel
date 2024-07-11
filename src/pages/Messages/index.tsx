import styled from "styled-components";
import PageWrapper from "../../assets/styles/PageWrapper";
import DefaultHeader from "../../components/mobile/headers/DefaultHeader";
import { useAuth } from "../../context/AuthContext";
import ChatRoomCard from "./ChatRoomCard";
import { useUserChatRooms } from "../../hooks/message/useUserChatRooms";
// import useSubscribeChatRooms from "../../hooks/message/useSubscribeChatRooms";

function Messages() {
  const { currentUser } = useAuth();
  const userId = currentUser?.uid ?? "";
  const { chatRooms, isLoading, error } = useUserChatRooms(userId);
  // useSubscribeChatRooms(userId); //채팅 구독
  return (
    <MessagesWrapper>
      <DefaultHeader />
      메시지
      {chatRooms?.map((room) => (
        <ChatRoomCard key={room.id} room={room} />
      ))}
    </MessagesWrapper>
  );
}
const MessagesWrapper = styled(PageWrapper)`
  /* Add your styles here */
`;

export default Messages;
