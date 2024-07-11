import { useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import styled from "styled-components";
import PageWrapper from "../../../assets/styles/PageWrapper";
import DefaultHeader from "../../../components/mobile/headers/DefaultHeader";
import BookCard from "../../Bookshelf/BookList/BookCard";
import useInfiniteLikedBooks from "../../../hooks/like/useInfiniteLikedBooks";

function LikeBooks() {
  const { currentUser } = useAuth();
  const {
    ref,
    likedBooksDatas, // likedBooksDatas로 수정
  } = useInfiniteLikedBooks(currentUser?.uid ?? ""); // useInfiniteLikedBooks 훅으로 수정

  useEffect(() => {
    console.log("likedBooksDatas", likedBooksDatas);
  }, [likedBooksDatas]);

  return (
    <LikeBooksWrapper>
      <DefaultHeader />
      {likedBooksDatas?.pages.map((page, pageIndex) => (
        <div key={pageIndex}>
          {page?.likedBooksData.map(
            (
              book: any // likedBooksData로 수정
            ) => (
              <BookCard key={book.id} book={book} />
            )
          )}
        </div>
      ))}
      <div ref={ref}></div>
    </LikeBooksWrapper>
  );
}

const LikeBooksWrapper = styled(PageWrapper)`
  /* Add your styles here */
`;

export default LikeBooks;
