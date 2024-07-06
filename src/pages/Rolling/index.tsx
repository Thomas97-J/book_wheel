import styled from "styled-components";
import PageWrapper from "../../assets/styles/PageWrapper";
import useRollingBooks from "../../hooks/books/useRollingBooks";
import React, { useEffect, useRef } from "react";
import BookShorts from "./BookShorts";
import { useInView } from "react-intersection-observer";

function Rolling() {
  const {
    getRef,
    bookData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useRollingBooks();

  useEffect(() => {
    // 페이지가 마운트될 때 body에 스타일을 적용
    document.body.style.overflow = "hidden";

    // 컴포넌트가 언마운트 될 때 body 스타일을 원래대로 복원
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <RollingWrapper>
      {bookData?.pages.map((page, pageIndex) => (
        <div key={pageIndex}>
          {page.books.map((book, bookIndex) => (
            <div ref={bookIndex === 1 ? getRef : null} key={bookIndex}>
              <BookShortsWithInView book={book} />
            </div>
          ))}
        </div>
      ))}
      {isFetchingNextPage && <div>Loading more...</div>}
    </RollingWrapper>
  );
}

function BookShortsWithInView({ book }: { book: any }) {
  return (
    <BookShortsWrapper>
      <BookShorts book={book} />
    </BookShortsWrapper>
  );
}

const BookShortsWrapper = styled.div`
  scroll-snap-align: start;
`;

const RollingWrapper = styled(PageWrapper)`
  display: flex;
  flex-direction: column;
  scroll-snap-type: y mandatory;
  overflow-y: auto;
  height: 100vh; /* 컨테이너 높이 설정 */
`;

export default Rolling;
