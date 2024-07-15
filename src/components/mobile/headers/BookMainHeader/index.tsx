import styled from "styled-components";
import Header from "../../../../assets/styles/Header";
import { useNavigate, useSearchParams } from "react-router-dom";
import React from "react";

function BookMainHeader() {
  const [query, setQuery] = useSearchParams();
  const nickname = query.get("user") ?? "";
  const navigate = useNavigate();

  return (
    <BookMainHeaderWrapper>
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
      {nickname}님의 책장
    </BookMainHeaderWrapper>
  );
}
const BookMainHeaderWrapper = styled(Header)`
  justify-content: flex-start;
  button {
    border: none;
  }
`;
const MemoizedBookMainHeader = React.memo(BookMainHeader);

export default MemoizedBookMainHeader;
