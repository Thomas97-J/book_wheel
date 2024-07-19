import styled from "styled-components";
import { usePaginationUserBook } from "../../../../hooks/books/usePaginationUserBook";
import { Link } from "react-router-dom";
import { PATH } from "../../../../App";
import { useEffect, useState } from "react";

function UserBookPagination({
  uid,
  isCheckable,
  selectedIndices,
  setSelectedIndices,
}: {
  uid: string | undefined;
  isCheckable: boolean;
  selectedIndices: number[];
  setSelectedIndices: any;
}) {
  const {
    page,
    setPage,
    totalPages,
    data,
    filter,
    setFilter,
    isLoading,
    status,
  } = usePaginationUserBook(uid);

  const handleCheckboxChange = (index: number) => {
    setSelectedIndices((prev: number[]) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  useEffect(() => {
    if (!isCheckable) {
      setFilter((prevFilter) => ({ ...prevFilter, indexes: selectedIndices }));
    }
  }, [selectedIndices]);

  return (
    <UserBookPaginationWrapper>
      {status === "error" && <p>Error loading data</p>}
      {status === "success" && (
        <>
          <ul>
            {data?.books.map((book: any, index: number) => (
              <BookItem key={index}>
                <input
                  type="checkbox"
                  checked={selectedIndices.includes(book.index)}
                  onChange={() => handleCheckboxChange(book.index)}
                  id={String(book.index)}
                  disabled={!isCheckable}
                />
                <label htmlFor={String(book.index)}></label>
                <BookLink to={`${PATH.bookDetail}?no=${book.index}`}>
                  <Title>{book.title}</Title>
                  <Author> / {book.author}</Author>
                </BookLink>
              </BookItem>
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
  padding-top: 10px;
  ul {
    list-style-type: none;
    padding: 0;
    display: flex;
    flex-direction: column;
  }
`;

const BookItem = styled.li`
  display: flex;
  align-items: center;
  padding: 4px 0;

  input {
    display: none;
  }

  label {
    width: 24px;
    height: 24px;
    border: 2px solid #707070;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-right: 8px;

    &::after {
      content: "✔";
      width: 12px;
      height: 12px;
      color: ${({ theme }) => theme.color.default_green};
      display: none;
      border-radius: 2px;
    }
  }
  input:disabled + label {
    opacity: 0.5;
  }
  input:checked + label::after {
    display: block;
  }
`;

const BookLink = styled(Link)`
  width: 100%;
  text-decoration: none;
  color: #666;
  display: flex;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 16px;
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
