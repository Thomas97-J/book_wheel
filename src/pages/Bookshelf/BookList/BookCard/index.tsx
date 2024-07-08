import { Link } from "react-router-dom";
import styled from "styled-components";
import { PATH } from "../../../../App";

function BookCard({ book }: { book: Book }) {
  return (
    <BookCardWapper to={`${PATH.bookDetail}?no=${book.index}`}>
      {book.photoUrl && <ThumbnailImage src={book.photoUrl} alt={book.title} />}
      <CardContent>
        <Title>{book.title}</Title>
        <Author>
          {book.author} / {book.publisher}
        </Author>
        {/* <Genres>{book.genres.join(", ")}</Genres> */}
        <Content>{book.content}</Content>
      </CardContent>
    </BookCardWapper>
  );
}

const BookCardWapper = styled(Link)`
  display: flex;
  overflow: hidden;
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
  margin: 0 10px;
  text-decoration: none;
`;

const ThumbnailImage = styled.img`
  min-width: 80px;
  height: 100px;
  margin-right: 10px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 4px 0;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  font-size: 16px;
  margin: 0 0 8px 0;
`;

const Author = styled.p`
  font-size: 12px;
  color: #555;
  margin: 0 0 8px 0;
`;

const Genres = styled.p`
  font-size: 14px;
  color: #777;
  margin: 0 0 8px 0;
`;

const Content = styled.p`
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
  font-size: 14px;

  display: -webkit-box;
  -webkit-line-clamp: 2; // 원하는 라인수
  -webkit-box-orient: vertical;
  margin: 0;
`;

export default BookCard;
