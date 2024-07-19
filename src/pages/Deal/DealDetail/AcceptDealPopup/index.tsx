import styled from "styled-components";
import useAddMessage from "../../../../hooks/message/useAddMessage";
import useCheckExistingChat from "../../../../hooks/message/useCheckExistingChat";
import useCreateChat from "../../../../hooks/message/useCreateChat";
import { useAuth } from "../../../../context/AuthContext";
import { useEffect, useState } from "react";
import AcceptBtn from "../../../../components/common/AcceptBtn";
import RejectBtn from "../../../../components/common/RejectBtn";
import { useUpdateDeal } from "../../../../hooks/deal/useUpdateDeal";

function AcceptDealPopup({
  setIsPopupOn,
  targetUserId,
  dealId,
  selectedBookIndexes,
}: {
  setIsPopupOn: (bool: boolean) => void;
  targetUserId: string;
  dealId: string;
  selectedBookIndexes: number[];
}) {
  const { currentUser } = useAuth();
  const uid = currentUser?.uid ?? "";
  let chatId = useCheckExistingChat(uid, targetUserId) ?? "";
  const createChatMutation = useCreateChat();
  console.log("uid, targetUserId", uid, targetUserId);
  console.log("chatId", chatId);

  const addMessageMutation = useAddMessage(chatId, targetUserId);
  const [popupWillClose, setPopupWillClose] = useState(false);
  const updateDealMutation = useUpdateDeal(dealId ?? "");

  useEffect(() => {
    if (popupWillClose) {
      setTimeout(() => {
        setIsPopupOn(false);
      }, 1000);
    }
  }, [popupWillClose]);

  const handleAccept = async () => {
    if (!chatId) {
      chatId = await createChatMutation.mutateAsync({
        userId1: uid,
        userId2: targetUserId,
      });
    }
    await updateDealMutation.mutateAsync({
      state: "accept",
      selected_book_indexes: selectedBookIndexes,
    });
    await addMessageMutation.mutateAsync({
      text: "교환을 수락했어요!",
      chatId: chatId,
      uid: uid ?? "",
      userName: currentUser?.displayName ?? "",
      isDealMessage: true,
      dealId: dealId,
    });
    setPopupWillClose(true);
  };

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
          <p>
            {popupWillClose
              ? "교환이 수락되었습니다."
              : "교환을 수락하시겠습니까?"}
          </p>
        </Content>
        <ButtonWrapper>
          <AcceptBtn onClick={handleAccept} disabled={popupWillClose}>
            확인
          </AcceptBtn>
          <RejectBtn
            onClick={() => {
              setIsPopupOn(false);
            }}
            disabled={popupWillClose}
          >
            취소
          </RejectBtn>
        </ButtonWrapper>
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
  width: 80%;
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
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
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
  margin-bottom: 16px;

  p {
    line-height: 1.2;
  }
`;

export default AcceptDealPopup;
