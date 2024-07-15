import { useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import styled from "styled-components";
import PageWrapper from "../../../assets/styles/PageWrapper";
import DefaultHeader from "../../../components/mobile/headers/DefaultHeader";
import BookCard from "../../../components/mobile/BookCard";
import useInfiniteLikedBooks from "../../../hooks/like/useInfiniteLikedBooks";
import ListEmpty from "../../../components/mobile/ListEmpty";
import LikeBookHeader from "../../../components/mobile/headers/LikeBookHeader";

function LikeBooks() {
  const { currentUser } = useAuth();
  const { ref, likedBooksDatas, isLoading } = useInfiniteLikedBooks(
    currentUser?.uid ?? ""
  );
  const isEmpty =
    !likedBooksDatas ||
    (likedBooksDatas?.pages[0]?.likedBooksData.length === 0 && !isLoading);

  useEffect(() => {
    console.log("likedBooksDatas", likedBooksDatas);
  }, [likedBooksDatas]);

  return (
    <LikeBooksWrapper>
      <LikeBookHeader />
      {isEmpty ? (
        <ListEmpty>관심 가는 책을 골라주세요!</ListEmpty>
      ) : (
        likedBooksDatas?.pages.map((page, pageIndex) => (
          <div key={pageIndex}>
            {page?.likedBooksData.map((book: any) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ))
      )}
      <div ref={ref}></div>
    </LikeBooksWrapper>
  );
}

const LikeBooksWrapper = styled(PageWrapper)`
  /* Add your styles here */
`;

export default LikeBooks;
