import { Link } from "react-router-dom";
import styled from "styled-components";
import { PATH } from "../../../App";
import ToggleSwitch from "../../common/ToggleSwitch";
import { useUpdatePublic } from "../../../hooks/books/useUpdatePublic";

function BookCard({
  filter,
  book,
  myBook,
  isOdd,
}: {
  filter?: any;
  book: Book | undefined;
  myBook?: boolean;
  isOdd?: boolean;
}) {
  const updatePublisherMutation = useUpdatePublic(book?.id ?? "", filter);
  if (!book) {
    return <></>;
  }
  return (
    <BookCardWrapper $isOdd={isOdd ?? false}>
      <CardLink to={`${PATH.bookDetail}?no=${book.index}`}>
        {book.photoUrl && (
          <ThumbnailImage src={book.photoUrl} alt={book.title} />
        )}
        <CardContent>
          <Title>{book.title}</Title>
          <Author>
            {book.author}
            {book.publisher ? ` / ${book.publisher}` : ""}
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

const BookCardWrapper = styled.div<{ $isOdd: boolean }>`
  display: flex;

  overflow: hidden;
  padding: 10px;
  height: 120px;
  background-color: ${(props) => (props.$isOdd ? "#F3F4F6" : "")};
  border-radius: 4px;
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
  border-radius: 4px;
`;
const PublicBtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 8px;
  strong {
    white-space: nowrap;
    margin-bottom: 4px;
    font-size: 14px;
    color: #666;
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
  line-height: 1.2;
`;

const Author = styled.p`
  font-size: 12px;
  color: #555;
  margin: 0 0 8px 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: 1.2;
`;

const Content = styled.p`
  font-size: 14px;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; // 원하는 라인수
  -webkit-box-orient: vertical;
  line-height: 1.2;
`;

export default BookCard;
