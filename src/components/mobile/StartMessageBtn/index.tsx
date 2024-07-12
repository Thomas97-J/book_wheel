import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import useCreateChat from "../../../hooks/message/useCreateChat";
import { PATH } from "../../../App";
import useCheckExistingChat from "../../../hooks/message/useCheckExistingChat";
import styled from "styled-components";

function StartMessageBtn({ targetUserId }: { targetUserId: string }) {
  const { currentUser } = useAuth();
  const uid = currentUser?.uid ?? "";
  const navigate = useNavigate();
  let chatId = useCheckExistingChat(uid, targetUserId);
  const createChatMutation = useCreateChat();

  const handleStartChat = async () => {
    if (!uid || !targetUserId) {
      console.error("User ID is missing");
      return;
    }

    try {
      if (!chatId) {
        chatId = await createChatMutation.mutateAsync({
          userId1: uid,
          userId2: targetUserId,
        });
      }
      if (chatId) {
        navigate(`${PATH.messageDetail}?chat=${chatId}`);
      }
    } catch (error) {
      console.error("Error starting chat:", error);
    }
  };

  return (
    <StartMessageBtnWrapper onClick={handleStartChat}>
      메시지 보내기
    </StartMessageBtnWrapper>
  );
}
const StartMessageBtnWrapper = styled.button`
  border: 1px solid #888;
  width: 120px;
  white-space: nowrap;
`;

export default StartMessageBtn;
