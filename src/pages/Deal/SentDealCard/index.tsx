import { Link } from "react-router-dom";
import { PATH } from "../../../App";
import styled from "styled-components";

function SentDealCard({ sentDeal }: { sentDeal: Deal }) {
  const dealState = sentDeal.state;
  return (
    <SentDealCardWrapper key={sentDeal.id} to={`${PATH.deal}/${sentDeal.id}`}>
      <UserName>
        {sentDeal.to_nickname}님에게 신청한 교환
        {dealState === "await" ? (
          <State>대기중</State>
        ) : dealState === "accept" ? (
          <State>진행중</State>
        ) : dealState === "finished" ? (
          <State>완료됨</State>
        ) : (
          <State className={"disabled"}>취소됨</State>
        )}
      </UserName>
      <BookName>{sentDeal.book_name}</BookName>{" "}
    </SentDealCardWrapper>
  );
}
const SentDealCardWrapper = styled(Link)`
  padding: 8px 0;
  text-decoration: none;
  color: #000;
  border-bottom: 1px solid #ccc;
`;
const UserName = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  margin-bottom: 4px;
`;
const BookName = styled.div`
  color: #666;
`;
const State = styled.span`
  color: #fff;
  background-color: ${({ theme }) => theme.color.default_green};
  border: solid 1px;
  border-color: initial;
  padding: 4px 6px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  margin: 0 8px;
  &.disabled {
    color: #666;
    background-color: ${({ theme }) => theme.color.default_gray_green};
    opacity: 0.7;
  }
`;

export default SentDealCard;
