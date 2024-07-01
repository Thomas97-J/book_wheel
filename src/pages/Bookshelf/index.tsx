import styled from "styled-components";
import BookList from "./BookList";
import PageWrapper from "../../assets/styles/PageWrapper";
import { Link } from "react-router-dom";
import { PATH } from "../../App";

function Bookshelf() {
  return (
    <BookshelfWrapper>
      <BookList />
      <NewBookButton to={PATH.bookEdit}>책 추가</NewBookButton>
    </BookshelfWrapper>
  );
}
const BookshelfWrapper = styled(PageWrapper)`
  /* Add your styles here */
`;
const NewBookButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 80px;
  right: 20px;
  z-index: 10;

  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 10%;
  width: 80px;
  height: 40px;
  font-size: 14px;
  white-space: nowrap;
  text-decoration: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export default Bookshelf;
