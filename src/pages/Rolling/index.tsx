import styled from "styled-components";
import PageWrapper from "../../assets/styles/PageWrapper";
import useRollingBooks from "../../hooks/books/useRollingBooks";
import React, { useEffect, useRef } from "react";
import BookShorts from "./BookShorts";
import { useInView } from "react-intersection-observer";
import { useLocation } from "react-router-dom";

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

  useEffect(() => {
    const scrollTarget = sessionStorage.getItem(`scrollTarget-/rolling`);

    if (scrollTarget) {
      console.log("scrollTarget", scrollTarget);

      let elem = document.getElementById(scrollTarget);
      console.log("elem", elem);

      if (elem) {
        elem.scrollIntoView({});
      }
    }
  }, [location]);
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
  const { inView, ref, entry } = useInView({ threshold: 0.8 });
  const location = useLocation();

  useEffect(() => {
    if (inView) {
      console.log("entry", entry, book);
      sessionStorage.setItem(
        `scrollTarget-${location.pathname}`,
        String(book.index)
      );
    }
  }, [inView]);
  // useEffect(() => {
  //   return () => {
  //     sessionStorage.setItem(
  //       `scrollPosition-${location.pathname}`,
  //       String(entry)
  //     );
  //   };
  // }, []);
  return (
    <BookShortsWrapper ref={ref} id={book.index}>
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
