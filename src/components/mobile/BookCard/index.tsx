import { Link } from "react-router-dom";
import styled from "styled-components";
import { PATH } from "../../../App";
import ToggleSwitch from "../../common/ToggleSwitch";
import { useUpdatePublic } from "../../../hooks/books/useUpdatePublic";

function BookCard({
  filter,
  book,
  myBook,
}: {
  filter?: any;
  book: Book;
  myBook?: boolean;
}) {
  console.log("book", book, filter);
  const updatePublisherMutation = useUpdatePublic(book?.id ?? "", filter);

  return (
    <BookCardWrapper>
      <CardLink to={`${PATH.bookDetail}?no=${book.index}`}>
        {book.photoUrl && (
          <ThumbnailImage src={book.photoUrl} alt={book.title} />
        )}
        <CardContent>
          <Title>{book.title}</Title>
          <Author>
            {book.author} / {book.publisher}
          </Author>
          {/* <Genres>{book.genres.join(", ")}</Genres> */}
          <Content>{book.content}</Content>
        </CardContent>
      </CardLink>
      {myBook && (
        <PublicBtnWrapper>
          <strong>공개하기</strong>
          <ToggleSwitch
            isOn={book?.isPublic}
            onToggle={async () => {
              await updatePublisherMutation.mutateAsync({
                bookId: book?.id ?? "",
                newIsPublic: !book?.isPublic,
              });
            }}
          />
        </PublicBtnWrapper>
      )}
    </BookCardWrapper>
  );
}

const BookCardWrapper = styled.div`
  display: flex;
  overflow: hidden;
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
  margin: 0 10px;
  height: 120px;
`;
const CardLink = styled(Link)`
  display: flex;
  flex: 1;
  text-decoration: none;
  color: #000;
`;
const ThumbnailImage = styled.img`
  width: 80px;
  height: 100px;
  margin-right: 10px;
  object-fit: cover;
`;
const PublicBtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 8px;
  strong {
    white-space: nowrap;
    margin-bottom: 4px;
  }
`;
const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
`;

const Title = styled.h2`
  font-size: 16px;
  margin: 0 0 8px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1; // 원하는 라인수
  -webkit-box-orient: vertical;
`;

const Author = styled.p`
  font-size: 12px;
  color: #555;
  margin: 0 0 8px 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const Content = styled.p`
  font-size: 14px;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; // 원하는 라인수
  -webkit-box-orient: vertical;
`;

export default BookCard;
