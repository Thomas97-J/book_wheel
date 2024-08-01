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
import AcceptBtn from "../../../components/common/AcceptBtn";
import ProfileForPost from "../../Main/PostDetail/ProfileForPost";

function BookDetail() {
  const { currentUser } = useAuth();
  const [query, setQuery] = useSearchParams();
  const bookIndex = parseInt(query.get("no") ?? "");
  const { bookData, isLoading } = useGetBookByIndex(bookIndex);
  const [isPopupOn, setIsPopupOn] = useState(false);
  const ownerId = bookData?.uid ?? "";
  const isOwner = ownerId === currentUser?.uid;
  if (isLoading) {
    return <Fallback />;
  }
  return (
    <BookDetailWrapper>
      <BookHeader user={currentUser} bookData={bookData} />
      <BookDetailBody>
        <ProfileForPost
          uid={ownerId}
          createdAt={bookData?.createdAt as Timestamp}
        />
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
          {!isOwner && (
            <AcceptBtn
              onClick={async () => {
                setIsPopupOn(true);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="rgba(255, 255, 255, 1)"
              >
                <path d="M19.924 10.383a1 1 0 0 0-.217-1.09l-5-5-1.414 1.414L16.586 9H4v2h15a1 1 0 0 0 .924-.617zM4.076 13.617a1 1 0 0 0 .217 1.09l5 5 1.414-1.414L7.414 15H20v-2H5a.999.999 0 0 0-.924.617z"></path>
              </svg>
              교환 신청하기
            </AcceptBtn>
          )}
        </LikeBtnWrapper>
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
const Content = styled.pre`
  font-size: 14px;
  color: #333;
  line-height: 1.3;
  margin-bottom: 8px;
  white-space: pre-wrap;
`;

export default BookDetail;
