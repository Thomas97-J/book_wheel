import styled from "styled-components";
import PageWrapper from "../../assets/styles/PageWrapper";
import useRollingBooks from "../../hooks/books/useRollingBooks";
import { useEffect, useRef } from "react";
import BookShorts from "./BookShorts";
import { useInView } from "react-intersection-observer";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useStore } from "zustand";
import useScrollStore from "../../stores/useScrollStore";

function Rolling() {
  const location = useLocation();

  const {
    getRef,
    bookData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useRollingBooks();
  const { setScrollTarget, scrollTarget, clearScrollTarget } = useScrollStore();
  const handleClick = (bookCardId: string) => {
    setScrollTarget(String(bookCardId));
  };

  useEffect(() => {
    if (scrollTarget) {
      const elem = document.getElementById(scrollTarget);
      if (elem) {
        elem.scrollIntoView({});
      }
      clearScrollTarget();
    }
  }, [location, scrollTarget, clearScrollTarget]);

  return (
    <RollingWrapper>
      <Helmet>
        <title>책바퀴 - 책바퀴 굴리기</title>
        <meta
          property="og:description"
          content="당신 주변의 모든 도서를 만나보세요."
        />
      </Helmet>
      {bookData?.pages.map((page, pageIndex) => (
        <div key={pageIndex}>
          {page.books.map((book, bookIndex) => {
            const bookCardId = `book-${book.index}`;
            return (
              <div
                ref={bookIndex === 1 ? getRef : null}
                key={bookIndex}
                onClick={() => {
                  handleClick(bookCardId);
                }}
              >
                <BookShortsWithInView book={book} />
              </div>
            );
          })}
        </div>
      ))}
    </RollingWrapper>
  );
}

function BookShortsWithInView({ book }: { book: any }) {
  const bookCardId = `book-${book.index}`;

  return (
    <BookShortsWrapper id={bookCardId}>
      <BookShorts book={book} />
    </BookShortsWrapper>
  );
}

const BookShortsWrapper = styled.div`
  scroll-snap-align: start;
`;

const RollingWrapper = styled(PageWrapper)`
  padding: 0;
  display: flex;
  flex-direction: column;
  scroll-snap-type: y mandatory;
  overflow-y: auto;
  height: 100vh; /* 컨테이너 높이 설정 */
`;

export default Rolling;
