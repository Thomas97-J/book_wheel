import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PageWrapper from "../../../assets/styles/PageWrapper";
import useGetUserById from "../../../hooks/users/useGetUserById";
import formatRelativeTime from "../../../utils/formatRelativeTime";
import BookCard from "../../../components/mobile/BookCard";
import useGetBookByIndex from "../../../hooks/books/useGetBookByIndex";
import UserBookPagination from "./UserBookPagination";
import { useGetDealById } from "../../../hooks/deal/useGetDealById";
import { useUpdateDeal } from "../../../hooks/deal/useUpdateDeal";
import DealDetailHeader from "../../../components/mobile/headers/DealDetailHeader";
import ProfileSimpleSmall from "../../../components/mobile/ProfileSimpleSmall";
import { useAuth } from "../../../context/AuthContext";
import AcceptDealPopup from "./AcceptDealPopup";

function DealDetail() {
  let { dealId } = useParams();

  const { dealData, isLoading } = useGetDealById(dealId ?? "");
  const { userData } = useGetUserById(dealData?.from_uid ?? "");
  const dealCreatedAt = formatRelativeTime(dealData?.createdAt);
  const { bookData: targetBookData } = useGetBookByIndex(
    dealData?.book_index ?? 0
  );
  const { currentUser } = useAuth();
  const updateDealMutation = useUpdateDeal(dealId ?? "");
  const [AcceptPopupOpen, setAcceptPopupOpen] = useState(false);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const isSentUser = currentUser?.uid === dealData?.from_uid;
  const isReceivedUser = currentUser?.uid === dealData?.to_uid;
  const handleFinished = async () => {
    await updateDealMutation.mutateAsync({ state: "finished" });
  };

  const handleReject = async () => {
    await updateDealMutation.mutateAsync({ state: "reject" });
  };
  useEffect(() => {
    if (dealData?.selected_book_indexes) {
      setSelectedIndices(dealData.selected_book_indexes);
    }
  }, [dealData]);

  return (
    <DealDetailWrapper>
      <DealDetailHeader
        nickname={userData?.nickname}
        dealState={dealData?.state}
      />
      <DealDetailBody>
        {AcceptPopupOpen && (
          <AcceptDealPopup
            setIsPopupOn={setAcceptPopupOpen}
            targetUserId={dealData?.from_uid ?? ""}
            dealId={dealId ?? ""}
            selectedBookIndexes={selectedIndices}
          />
        )}
        <ProfileSimpleSmall uid={dealData?.from_uid ?? ""} />
        <DealDate>신청 일시 : {dealCreatedAt}</DealDate>
        <BookInfo>신청 도서</BookInfo>
        <BookCard book={targetBookData} isOdd={true} />
        <UserBookSection>
          <Title>{userData?.nickname}님의 도서 목록</Title>
          <SubTitle>
            {isReceivedUser
              ? "교환을 희망하는 도서를 선택하세요."
              : `${dealData?.to_nickname}님의 선택을 확인하세요.`}
          </SubTitle>
          <UserBookPagination
            isCheckable={dealData?.state === "await" && isReceivedUser}
            uid={dealData?.from_uid}
            selectedIndices={selectedIndices}
            setSelectedIndices={setSelectedIndices}
          />
        </UserBookSection>
        {isSentUser ? (
          ""
        ) : dealData?.state === "accept" ? (
          <ButtonWrapper>
            <AcceptBtn onClick={handleFinished}>완료</AcceptBtn>
            <RejectBtn onClick={handleReject}>취소</RejectBtn>
          </ButtonWrapper>
        ) : dealData?.state === "reject" ? (
          <ButtonWrapper>
            <RejectBtn onClick={() => {}} disabled>
              취소된 요청입니다.
            </RejectBtn>
          </ButtonWrapper>
        ) : dealData?.state === "finished" ? (
          <ButtonWrapper>
            <RejectBtn onClick={() => {}} disabled>
              완료된 요청입니다.
            </RejectBtn>
          </ButtonWrapper>
        ) : (
          <ButtonWrapper>
            <AcceptBtn
              onClick={() => {
                setAcceptPopupOpen(true);
              }}
            >
              수락
            </AcceptBtn>
            <RejectBtn onClick={handleReject}>거절</RejectBtn>
          </ButtonWrapper>
        )}
      </DealDetailBody>
    </DealDetailWrapper>
  );
}

const DealDetailWrapper = styled(PageWrapper)`
  /* Add your styles here */
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const DealDate = styled.div`
  margin-bottom: 16px;
  color: #666;
  font-size: 14px;
`;
const BookInfo = styled.div`
  font-weight: bold;
  margin-bottom: 4px;
`;

const UserBookSection = styled.section`
  margin-top: 16px;
`;
const Title = styled.h2`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 2px;
`;
const SubTitle = styled.span`
  font-size: 12px;
  color: #666;
  padding-bottom: 6px;
`;
const AcceptBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
  margin: 6px;

  height: 30px;
  border: solid 1px;
  border-radius: 6px;
  color: #fff;
  background-color: ${({ theme }) => theme.color.default_green};
  border-color: initial;
`;

const RejectBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
  margin: 6px;

  height: 30px;
  border: solid 1px;
  border-radius: 6px;
  color: #666;
  background-color: ${({ theme }) => theme.color.default_gray_green};
  border-color: initial;
  &:disabled {
    color: #666;
    background-color: ${({ theme }) => theme.color.default_gray_green};
    opacity: 0.7;
  }
`;
const DealDetailBody = styled.div`
  padding: 0 20px;
`;

export default DealDetail;
