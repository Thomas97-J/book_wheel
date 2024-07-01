import styled from "styled-components";
import Fallback from "../../../components/mobile/Fallback";
import _ from "lodash";
import DropDownSelect from "../../../components/common/DropDownSelect";
import BookCard from "./BookCard";
import useInfiniteBooks from "../../../hooks/books/useInfiniteBooks";
import useGetUidByNickname from "../../../hooks/users/useGetUidByNickname";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

function BookList() {
  const [query, setQuery] = useSearchParams();
  const nickname = query.get("user") ?? "";
  const { targetUid, isLoading } = useGetUidByNickname(nickname);
  const [initialFilter, setInitailFilter] = useState({});
  const {
    ref,
    bookData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    filter,
    setFilter,
  } = useInfiniteBooks(initialFilter, 1);

  useEffect(() => {
    if (targetUid) {
      setFilter({ uid: targetUid });
    }
    console.log(targetUid);
  }, [targetUid]);
  const options = [
    { label: "도서", value: "book" },
    { label: "취미", value: "hobby" },
    { label: "전체", value: "all" },
  ];

  const handleSelect = (option: any) => {
    console.log("Selected option:", option);
  };

  // if (isLoading) {
  //   return <Fallback />;
  // }

  return (
    <PostSectionWrapper>
      <StickyMenu>
        <DropDownSelect
          options={options}
          onSelect={handleSelect}
          placeholder="전체"
        />
      </StickyMenu>
      {bookData?.pages.map((page, pageIndex) => (
        <div key={pageIndex}>
          {page?.books.map((book: any) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ))}
      <div ref={ref}></div>
    </PostSectionWrapper>
  );
}
const PostSectionWrapper = styled.div`
  min-height: 70vh;
  width: 100%;
  border: solid 1px;
  position: relative;
`;
const StickyMenu = styled.div`
  position: sticky;
  background: #fff;
  top: 60px;
  height: 50px;
`;
export default BookList;
