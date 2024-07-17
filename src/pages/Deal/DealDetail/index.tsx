import styled from "styled-components";

function DealDetail() {
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
