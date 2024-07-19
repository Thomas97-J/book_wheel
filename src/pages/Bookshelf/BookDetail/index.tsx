import { useSearchParams } from "react-router-dom";
import useGetBookByIndex from "../../../hooks/books/useGetBookByIndex";
import Fallback from "../../../components/mobile/Fallback";
import styled from "styled-components";
import BookHeader from "../../../components/mobile/headers/BookHeader";
import { useAuth } from "../../../context/AuthContext";
import PageWrapper from "../../../assets/styles/PageWrapper";
import LikeBtnBook from "../../../components/mobile/LikeBtnBook";
import ProfileSimple from "../../../components/mobile/ProfileSimple";
import CreateDealPopup from "./CreateDealPopup";
import { useState } from "react";

function BookDetail() {
  const { currentUser } = useAuth();
  const [query, setQuery] = useSearchParams();
  const bookIndex = parseInt(query.get("no") ?? "");
  const { bookData, isLoading } = useGetBookByIndex(bookIndex);
  const [isPopupOn, setIsPopupOn] = useState(false);
  const ownerId = bookData?.uid ?? "";
  if (isLoading) {
    return <Fallback />;
  }
  return (
    <BookDetailWrapper>
      <BookHeader user={currentUser} bookData={bookData} />
      <BookDetailBody>
        <ProfileSimple uid={ownerId} />
        {bookData?.photoUrl && (
          <BookImage src={bookData?.photoUrl} alt="도서 이미지" />
        )}
        <Title>{bookData?.title}</Title>
        <Author>
          {bookData?.author}
          {bookData?.publisher ? ` / ${bookData?.publisher}` : ""}
        </Author>
        <Content>{bookData?.content}</Content>
        <LikeBtnWrapper>
          <LikeBtnBook
            bookId={bookData?.id ?? ""}
            userId={currentUser?.uid ?? ""}
          />
        </LikeBtnWrapper>
        <button
          onClick={async () => {
            setIsPopupOn(true);
          }}
        >
          교환 신청하기
        </button>
        {isPopupOn && (
          <CreateDealPopup
            setIsPopupOn={setIsPopupOn}
            targetUserId={ownerId}
            bookIndex={bookIndex}
            bookName={bookData?.title ?? ""}
          />
        )}
      </BookDetailBody>
    </BookDetailWrapper>
  );
}

const BookDetailWrapper = styled(PageWrapper)`
  /* Add your styles here */
`;

const BookDetailBody = styled.div`
  padding: 0 10px;
`;
const LikeBtnWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const BookImage = styled.img`
  width: 100%;
  margin-bottom: 10px;
  object-fit: cover;
`;
const Title = styled.h2`
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 8px;
`;
const Author = styled.p`
  font-size: 16px;
  color: #555;
  margin-bottom: 8px;
`;
const Content = styled.p`
  font-size: 14px;
  color: #333;
  line-height: 1.3;
  margin-bottom: 8px;
`;

export default BookDetail;
