import { useSearchParams } from "react-router-dom";
import useGetBookByIndex from "../../../hooks/books/useGetBookByIndex";
import Fallback from "../../../components/mobile/Fallback";
import styled from "styled-components";
import BookHeader from "../../../components/mobile/headers/BookHeader";
import { useAuth } from "../../../context/AuthContext";
import PageWrapper from "../../../assets/styles/PageWrapper";
import LikeBtnBook from "../../../components/mobile/LikeBtnBook";
import ProfileSimple from "../../../components/mobile/ProfileSimple";

function BookDetail() {
  const { currentUser } = useAuth();
  const [query, setQuery] = useSearchParams();
  const bookIndex = parseInt(query.get("no") ?? "");
  const { bookData, isLoading } = useGetBookByIndex(bookIndex);
  const ownerId = bookData?.uid ?? "";
  if (isLoading) {
    return <Fallback />;
  }
  return (
    <BookDetailWrapper>
      <BookHeader user={currentUser} bookData={bookData} />
      <ProfileSimple uid={ownerId} />
      {bookData?.photoUrl && (
        <BookImage src={bookData?.photoUrl} alt="도서 이미지" />
      )}
      <h2>{bookData?.title}</h2>
      <div>{bookData?.author}</div>
      <div>{bookData?.content}</div>
      <LikeBtnBook
        bookId={bookData?.id ?? ""}
        userId={currentUser?.uid ?? ""}
      />
    </BookDetailWrapper>
  );
}
const BookDetailWrapper = styled(PageWrapper)`
  /* Add your styles here */
`;
const BookImage = styled.img`
  max-height: 400px;
  object-fit: contain;
`;
export default BookDetail;
