import styled from "styled-components";
import { useGetDealById } from "../../../hooks/deal/useGetDealById";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

function DealDetail() {
  let { deald } = useParams();

  const { dealDatas, isLoading } = useGetDealById(deald ?? "");

  useEffect(() => {
    console.log("dealDatas", dealDatas);
  }, [dealDatas]);
  return (
    <DealDetailWrapper>
      <div>~님의 거래 요청</div>
      <div>거래 상태</div>
      <div>날짜</div>
      <div>~의 프로필</div>
      거래 요청 도서
      <div>도서 정보</div>
      ~님의 도서 목록
      <div>도서 목록</div>
      <button>수락</button>
      <button>거절</button>
    </DealDetailWrapper>
  );
}
const DealDetailWrapper = styled.div`
  /* Add your styles here */
`;

export default DealDetail;
