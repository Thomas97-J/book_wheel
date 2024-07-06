import styled from "styled-components";
import { PATH } from "../../../App";
import { Link } from "react-router-dom";

function BookShorts({ book }: { book: Book }) {
  return (
    <BookShortsWapper to={`${PATH.bookDetail}?no=${book.index}`}>
      {book.photoUrl && <ThumbnailImage src={book.photoUrl} alt={book.title} />}
      <CardContent>
        <Title>{book.title}</Title>
        <Author>{book.author}</Author>
        {/* <Genres>{book.genres.join(", ")}</Genres> */}
        <Content>{book.content}</Content>
      </CardContent>
    </BookShortsWapper>
  );
}

const BookShortsWapper = styled(Link)`
  display: flex;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 16px;
  height: calc(100vh - 50px); /* 바텀 바의 높이를 제외한 전체 화면 높이 */
`;

const ThumbnailImage = styled.img`
  width: 100px;
  height: 120px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 4px 16px;
`;

const Title = styled.h2`
  font-size: 20px;
  margin: 0 0 8px 0;
`;

const Author = styled.p`
  font-size: 16px;
  color: #555;
  margin: 0 0 8px 0;
`;

const Genres = styled.p`
  font-size: 14px;
  color: #777;
  margin: 0 0 8px 0;
`;

const Content = styled.p`
  font-size: 14px;
  color: #333;
`;

export default BookShorts;
