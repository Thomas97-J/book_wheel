import styled from "styled-components";
import { useCreateDeal } from "../../../../hooks/deal/useCreateDeal";
import useAddMessage from "../../../../hooks/message/useAddMessage";
import useCheckExistingChat from "../../../../hooks/message/useCheckExistingChat";
import useCreateChat from "../../../../hooks/message/useCreateChat";
import { useAuth } from "../../../../context/AuthContext";

function CreateDealPopup({
  setIsPopupOn,
  targetUserId,
  bookId,
}: {
  setIsPopupOn: (bool: boolean) => void;
  targetUserId: string;
  bookId: string;
}) {
  const { currentUser } = useAuth();
  const uid = currentUser?.uid ?? "";
  let chatId = useCheckExistingChat(uid, targetUserId) ?? "";
  const createChatMutation = useCreateChat();

  const addMessageMutation = useAddMessage(chatId, targetUserId);
  const createDealMutation = useCreateDeal();

  return (
    <Overlay
      onClick={(e) => {
        e.stopPropagation();
        setIsPopupOn(false);
      }}
    >
      <PopupContainer
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <CloseButton
          onClick={(e) => {
            e.stopPropagation();
            setIsPopupOn(false);
          }}
        >
          X
        </CloseButton>
        <Content>
          <h2>제목</h2>
          <p>거래를 진행하시겠습니까?</p>
        </Content>
        <button
          onClick={async () => {
            if (!chatId) {
              chatId = await createChatMutation.mutateAsync({
                userId1: uid,
                userId2: targetUserId,
              });
            }
            const dealId = await createDealMutation.mutateAsync({
              from_uid: uid,
              to_uid: targetUserId,
              book_id: bookId,
            });
            await addMessageMutation.mutateAsync({
              text: `${currentUser?.displayName ?? ""}님의 교환 신청`,
              chatId: chatId,
              uid: uid ?? "",
              userName: currentUser?.displayName ?? "",
              isDealMessage: true,
              dealId: dealId,
            });
          }}
        >
          확인
        </button>
        <button onClick={() => {}}>취소</button>
      </PopupContainer>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
`;

const PopupContainer = styled.div`
  background: white;
  border-radius: 10px;
  width: 90%;
  max-width: 400px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 200px;
    height: 200px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const Content = styled.div`
  h2 {
    margin-top: 0;
    margin-bottom: 20px;
  }
  p {
    line-height: 1.2;
  }
`;

export default CreateDealPopup;
