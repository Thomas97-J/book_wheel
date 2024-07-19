import styled from "styled-components";
import Header from "../../../../assets/styles/Header";
import { useNavigate } from "react-router-dom";

function DealDetailHeader({
  nickname,
  dealState,
}: {
  nickname: string;
  dealState: string | undefined;
}) {
  const navigate = useNavigate();

  return (
    <DefaultHeaderWrapper>
      <button
        type="button"
        onClick={() => {
          navigate(-1);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="rgba(0, 0, 0, 1)"
        >
          <path d="M13.939 4.939 6.879 12l7.06 7.061 2.122-2.122L11.121 12l4.94-4.939z"></path>
        </svg>
      </button>
      <Nickname>{nickname}님의 거래 요청</Nickname>{" "}
      {dealState === "await" ? (
        <State>대기중</State>
      ) : dealState === "accept" ? (
        <State>진행중</State>
      ) : dealState === "finished" ? (
        <State>완료됨</State>
      ) : (
        <State className={"disabled"}>취소됨</State>
      )}
    </DefaultHeaderWrapper>
  );
}
const DefaultHeaderWrapper = styled(Header)`
  justify-content: flex-start;
  button {
    border: none;
  }
`;
const Nickname = styled.div`
  width: 100%;
`;
const State = styled.span`
  color: #fff;
  background-color: ${({ theme }) => theme.color.default_green};
  border: solid 1px;
  border-color: initial;
  padding: 6px 8px;
  border-radius: 4px;
  font-size: 14px;
  white-space: nowrap;
  margin: 0 8px;
  &.disabled {
    color: #666;
    background-color: ${({ theme }) => theme.color.default_gray_green};
    opacity: 0.7;
  }
`;

export default DealDetailHeader;
