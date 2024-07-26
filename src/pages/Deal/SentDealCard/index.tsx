import { Link } from "react-router-dom";
import { PATH } from "../../../App";
import styled from "styled-components";
import DateString from "../../../components/common/DateString";

function SentDealCard({ sentDeal }: { sentDeal: Deal }) {
  const dealState = sentDeal.state;
  return (
    <SentDealCardWrapper key={sentDeal.id} to={`${PATH.deal}/${sentDeal.id}`}>
      <UserName>{sentDeal.to_nickname}님에게 신청한 교환</UserName>{" "}
      <DateString fontSize="12px" date={sentDeal?.updatedAt} />
      <BookName>{sentDeal.book_name}</BookName>{" "}
      {dealState === "await" ? (
        <State>대기중</State>
      ) : dealState === "accept" ? (
        <State>진행중</State>
      ) : dealState === "finished" ? (
        <State>완료됨</State>
      ) : (
        <State className={"disabled"}>취소됨</State>
      )}
    </SentDealCardWrapper>
  );
}
const SentDealCardWrapper = styled(Link)`
  padding: 16px 12px;
  margin-bottom: 8px;
  text-decoration: none;
  color: #000;
  background: #f3f4f6;

  border-bottom: 1px solid #ccc;

  box-shadow: 0px 4px 6px -1px #0000001a;
  border-radius: 6px;
`;
const UserName = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  margin-bottom: 8px;
  font-size: 14px;
`;
const BookName = styled.div`
  color: #111827;
  margin-top: 10px;
  margin-bottom: 8px;
  font-size: 14px;
`;
const State = styled.span`
  display: flex;

  width: 60px;
  height: 24px;
  align-items: center;
  justify-content: center;
  color: #f9fafb;
  background-color: ${({ theme }) => theme.color.default_green};
  border: none;
  padding: 4px 6px;
  border-radius: 50px;
  font-size: 12px;
  white-space: nowrap;
  &.disabled {
    background-color: #ef4444;
  }
  &.await {
    background-color: #f59e0b;
  }
  &.accept {
    background-color: ${({ theme }) => theme.color.default_green};
  }
  &.finished {
    opacity: 0.5;
  }
`;

export default SentDealCard;
