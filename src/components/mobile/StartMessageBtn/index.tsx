import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import useCreateChat from "../../../hooks/message/useCreateChat";
import { PATH } from "../../../App";
import useCheckExistingChat from "../../../hooks/message/useCheckExistingChat";

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

  return <button onClick={handleStartChat}>Start Chat</button>;
}

export default StartMessageBtn;
