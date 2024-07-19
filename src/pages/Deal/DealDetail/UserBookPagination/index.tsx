import styled from "styled-components";
import { usePaginationUserBook } from "../../../../hooks/books/usePaginationUserBook";
import { Link } from "react-router-dom";
import { PATH } from "../../../../App";

function UserBookPagination({ uid }: { uid: string | undefined }) {
  const { page, setPage, totalPages, data, isLoading, status } =
    usePaginationUserBook(uid);

  return (
    <UserBookPaginationWrapper>
      {status === "error" && <p>Error loading data</p>}
      {status === "success" && (
        <>
          <ul>
            {data?.books.map((book: any, index: number) => (
              <BookLink to={`${PATH.bookDetail}?no=${book.index}`} key={index}>
                <Title>{book.title}</Title>
                <Author> / {book.author}</Author>
              </BookLink>
            ))}
          </ul>
          <Pagination>
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              이전
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => setPage(pageNumber)}
                  disabled={pageNumber === page}
                >
                  {pageNumber}
                </button>
              )
            )}
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
            >
              다음
            </button>
          </Pagination>
        </>
      )}
    </UserBookPaginationWrapper>
  );
}

const UserBookPaginationWrapper = styled.div`
  ul {
    list-style-type: none;
    padding: 0;
    display: flex;
    flex-direction: column;
  }
`;
const BookLink = styled(Link)`
  width: 100%;
  text-decoration: none;
  color: #666;
  padding: 8px 0;
  display: flex;
  align-items: center;
`;
const Title = styled.h2`
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1; // 원하는 라인수
  -webkit-box-orient: vertical;
`;

const Author = styled.p`
  font-size: 12px;
  margin-left: 4px;
  color: #555;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: 1.2;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 10px;

  button {
    padding: 5px 10px;
    border: 1px solid #ccc;
    background-color: white;
    cursor: pointer;

    &:disabled {
      cursor: not-allowed;
      opacity: 0.8;
    }

    &:not(:disabled):hover {
      background-color: #f0f0f0;
    }
  }
`;

export default UserBookPagination;
