import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import _ from "lodash";
import BookCard from "../../../components/mobile/BookCard";
import useInfiniteBooks from "../../../hooks/books/useInfiniteBooks";
import LoadingSpinner from "../../../components/mobile/LoadingSpinner";
import BookCardSkeleton from "../../../components/mobile/BookCardSkeleton";

interface Search {
  type: string;
  keyword: string;
}

enum SearchType {
  User = "USER",
  Book = "BOOK",
}

function BookExplore() {
  const [initialFilter, setInitailFilter] = useState({});
  const {
    ref,
    bookData,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    filter,
    setFilter,
  } = useInfiniteBooks(initialFilter, 1);
  const isFirstLoading = bookData === undefined && isLoading;
  const { register, handleSubmit } = useForm<Search>({ mode: "onChange" });

  useEffect(() => {
    console.log("explore:bookData", bookData);
  }, [bookData]);

  const debouncedSearch = useMemo(
    () =>
      _.debounce(async (keyword: string) => {
        setFilter({ ...filter, keyword: keyword });
      }, 500),
    []
  );

  async function onSearch(data: Search) {
    try {
      if (data.type === SearchType.Book) {
        await debouncedSearch(data.keyword);
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <BookExploreWrapper>
      {!isFirstLoading && isLoading && <LoadingSpinner />}
      <SearchForm onSubmit={handleSubmit(onSearch)}>
        <SearchInput
          {...register("keyword", { required: true })}
          onChange={(e) => {
            onSearch({ type: SearchType.Book, keyword: e.target.value });
          }}
          placeholder="검색어를 입력하세요."
          type="text"
        />
      </SearchForm>
      {isFirstLoading ? (
        <>
          <BookCardSkeleton />
          <BookCardSkeleton />
          <BookCardSkeleton />
        </>
      ) : (
        bookData?.pages.map((page, pageIndex) => (
          <div key={pageIndex}>
            {page?.books.map((book: any) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ))
      )}
      <div ref={ref}></div>
    </BookExploreWrapper>
  );
}

const BookExploreWrapper = styled.div`
  position: relative;
`;

const SearchForm = styled.form`
  position: fixed;
  left: 0;
  top: 93px;
  width: 100%;
  background: #fff;
  z-index: 100;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
`;
const SearchInput = styled.input`
  height: 40px;
  width: 100%;
`;
export default BookExplore;
