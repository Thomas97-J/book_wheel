import { useSearchParams } from "react-router-dom";
import useGetBookByIndex from "../../../hooks/books/useGetBookByIndex";
import Fallback from "../../../components/mobile/Fallback";
import styled from "styled-components";
import BookHeader from "../../../components/mobile/headers/BookHeader";
import { useAuth } from "../../../context/AuthContext";

function BookDetail() {
  const { currentUser } = useAuth();

  const [query, setQuery] = useSearchParams();
  const bookIndex = parseInt(query.get("no") ?? "");
  const { bookData, isLoading } = useGetBookByIndex(bookIndex);
  if (isLoading) {
    return <Fallback />;
  }
  return (
    <BookDetailWrapper>
      <BookHeader user={currentUser} bookData={bookData} />
      {bookData?.photoUrl && <img src={bookData?.photoUrl} alt="도서 이미지" />}
      <h2>{bookData?.title}</h2>
      <div>{bookData?.author}</div>
      <div>{bookData?.content}</div>
    </BookDetailWrapper>
  );
}
const BookDetailWrapper = styled.div`
  /* Add your styles here */
`;

export default BookDetail;
