import styled from "styled-components";
import { usePaginationUserBook } from "../../../../hooks/books/usePaginationUserBook";
import { Link } from "react-router-dom";
import { PATH } from "../../../../App";
import { useEffect, useState } from "react";
import BookCardSmall from "../../../../components/mobile/BookCardSmall";

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
            {data?.map((book: any, index: number) => (
              <BookItem key={index} $isOdd={index % 2 === 1}>
                <input
                  type="checkbox"
                  checked={selectedIndices.includes(book.index)}
                  onChange={() => handleCheckboxChange(book.index)}
                  id={String(book.index)}
                  disabled={!isCheckable}
                />

                <label htmlFor={String(book.index)}>
                  {selectedIndices.includes(book.index) ? (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 4C0 1.79086 1.79086 0 4 0H20C22.2091 0 24 1.79086 24 4V20C24 22.2091 22.2091 24 20 24H4C1.79086 24 0 22.2091 0 20V4Z"
                        fill="#10B981"
                      />
                      <path
                        d="M15.7125 8.2125C15.8885 8.04486 16.1229 7.95218 16.366 7.95402C16.6091 7.95586 16.842 8.05207 17.0155 8.22236C17.189 8.39264 17.2896 8.62368 17.2961 8.86672C17.3025 9.10975 17.2142 9.34578 17.05 9.525L12.0625 15.7625C11.9767 15.8549 11.8732 15.929 11.7581 15.9805C11.6431 16.0319 11.5188 16.0596 11.3928 16.062C11.2667 16.0643 11.1415 16.0412 11.0246 15.994C10.9078 15.9469 10.8016 15.8766 10.7125 15.7875L7.40495 12.48C7.31284 12.3942 7.23897 12.2907 7.18773 12.1757C7.13649 12.0607 7.10893 11.9365 7.10671 11.8107C7.10449 11.6848 7.12765 11.5597 7.1748 11.443C7.22195 11.3263 7.29213 11.2202 7.38116 11.1312C7.47018 11.0422 7.57622 10.972 7.69296 10.9248C7.80969 10.8777 7.93473 10.8545 8.06061 10.8568C8.18648 10.859 8.31063 10.8865 8.42563 10.9378C8.54062 10.989 8.64413 11.0629 8.72995 11.155L11.3475 13.7712L15.6887 8.24L15.7125 8.2125Z"
                        fill="#F9FAFB"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.75 4C0.75 2.20508 2.20507 0.75 4 0.75H20C21.7949 0.75 23.25 2.20507 23.25 4V20C23.25 21.7949 21.7949 23.25 20 23.25H4C2.20508 23.25 0.75 21.7949 0.75 20V4Z"
                        fill="#F9FAFB"
                      />
                      <path
                        d="M0.75 4C0.75 2.20508 2.20507 0.75 4 0.75H20C21.7949 0.75 23.25 2.20507 23.25 4V20C23.25 21.7949 21.7949 23.25 20 23.25H4C2.20508 23.25 0.75 21.7949 0.75 20V4Z"
                        stroke="#9CA3AF"
                        strokeWidth="1.5"
                      />
                    </svg>
                  )}
                </label>
                <BookCardSmall book={book} isOdd={index % 2 === 1} />
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

const BookItem = styled.li<{ $isOdd: boolean }>`
  display: flex;
  align-items: center;
  padding: 4px 0;
  background-color: ${(props) => (props.$isOdd ? "#F3F4F6" : "")};
  border-radius: 4px;
  padding: 0 10px;
  input {
    display: none;
  }

  label {
    min-width: 24px;
    min-height: 24px;
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
