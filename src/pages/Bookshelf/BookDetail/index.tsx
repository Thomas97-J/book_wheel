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
      <Title>{bookData?.title}</Title>
      <Author>{bookData?.author}</Author>
      <Content>{bookData?.content}</Content>
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
  width: 100%;
  margin-bottom: 10px;
  object-fit: cover;
`;
const Title = styled.h2`
  font-weight: bold;
  font-size: 20px;
  margin: 0 0 8px 0;
`;
const Author = styled.p`
  font-size: 16px;
  color: #555;
  margin: 0 0 8px 0;
`;
const Content = styled.p`
  font-size: 14px;
  color: #333;
`;

export default BookDetail;
