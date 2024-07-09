import styled from "styled-components";
import PageWrapper from "../../assets/styles/PageWrapper";
import DefaultHeader from "../../components/mobile/headers/DefaultHeader";
import useFetchUserChatRooms from "../../hooks/message/useFetchUserChatRooms";
import { useAuth } from "../../context/AuthContext";
import ChatRoomCard from "./ChatRoomCard";

function Messages() {
  const { currentUser } = useAuth();
  const {
    data: chatRooms,
    isLoading,
    error,
  } = useFetchUserChatRooms(currentUser?.uid ?? "");

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

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
