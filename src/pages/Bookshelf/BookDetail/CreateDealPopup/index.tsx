import styled from "styled-components";
import { useCreateDeal } from "../../../../hooks/deal/useCreateDeal";
import useAddMessage from "../../../../hooks/message/useAddMessage";
import useCheckExistingChat from "../../../../hooks/message/useCheckExistingChat";
import useCreateChat from "../../../../hooks/message/useCreateChat";
import { useAuth } from "../../../../context/AuthContext";
import useGetUserById from "../../../../hooks/users/useGetUserById";
import { useEffect, useState } from "react";
import AcceptBtn from "../../../../components/common/AcceptBtn";
import RejectBtn from "../../../../components/common/RejectBtn";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../../../App";

function CreateDealPopup({
  setIsPopupOn,
  targetUserId,
  bookIndex,
  bookName,
}: {
  setIsPopupOn: (bool: boolean) => void;
  targetUserId: string;
  bookIndex: number;
  bookName: string;
}) {
  const { currentUser } = useAuth();
  const uid = currentUser?.uid ?? "";
  const fromNickname = currentUser?.displayName ?? "";
  let chatId = useCheckExistingChat(uid, targetUserId) ?? "";
  const createChatMutation = useCreateChat();
  const navigate = useNavigate();
  const addMessageMutation = useAddMessage(chatId, targetUserId);
  const createDealMutation = useCreateDeal();
  const { userData } = useGetUserById(targetUserId);
  const [popupWillClose, setPopupWillClose] = useState(false);
  const toNickname = userData?.nickname as string;
  const [newDealId, setNewDealId] = useState("");

  async function handleCreateDeal() {
    if (!chatId) {
      chatId = await createChatMutation.mutateAsync({
        userId1: uid,
        userId2: targetUserId,
      });
    }
    const dealId = await createDealMutation.mutateAsync({
      fromUid: uid,
      fromNickname: fromNickname,
      toUid: targetUserId,
      toNickname: toNickname,
      bookIndex: bookIndex,
      bookName: bookName,
    });
    await addMessageMutation.mutateAsync({
      text: `${currentUser?.displayName ?? ""}님의 교환 신청`,
      chatId: chatId,
      uid: uid ?? "",
      userName: currentUser?.displayName ?? "",
      isDealMessage: true,
      dealId: dealId,
    });
    setNewDealId(dealId ?? "");
    setPopupWillClose(true);
  }

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
            {popupWillClose ? (
              <>
                <Bold>신청 완료</Bold>
                <div>상세 페이지로 이동하시겠습니까?</div>
              </>
            ) : (
              "교환을 신청하시겠습니까?"
            )}
          </p>
        </Content>
        <ButtonWrapper>
          <AcceptBtn
            onClick={async () => {
              if (popupWillClose) {
                navigate(`${PATH.deal}/${newDealId}`);
              } else {
                handleCreateDeal();
              }
            }}
          >
            확인
          </AcceptBtn>
          <RejectBtn
            onClick={() => {
              setIsPopupOn(false);
            }}
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
const Bold = styled.div`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 16px;
  margin-top: 8px;
`;
const Content = styled.div`
  margin-bottom: 16px;

  p {
    line-height: 1.2;
  }
`;

export default CreateDealPopup;
