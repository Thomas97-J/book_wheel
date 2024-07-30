import styled from "styled-components";
import Fallback from "../../../components/mobile/Fallback";
import _ from "lodash";
import DropDownSelect from "../../../components/common/DropDownSelect";
import BookCard from "../../../components/mobile/BookCard";
import useInfiniteBooks from "../../../hooks/books/useInfiniteBooks";
import useGetUidByNickname from "../../../hooks/users/useGetUidByNickname";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../../components/mobile/LoadingSpinner";
import { useAuth } from "../../../context/AuthContext";
import ListEmpty from "../../../components/mobile/ListEmpty";

function BookList() {
  const { currentUser } = useAuth();
  const [query, setQuery] = useSearchParams();
  const nickname = query.get("user") ?? "";
  const { targetUid } = useGetUidByNickname(nickname);
  const [initialFilter, setInitailFilter] = useState({
    owner: true,
    uid: targetUid,
  });
  const { ref, bookData, isLoading, filter, setFilter } = useInfiniteBooks(
    null,
    1
  );
  const isEmpty = bookData?.pages[0]?.books.length === 0 && !isLoading;

  useEffect(() => {
    if (targetUid) {
      setFilter({ ...initialFilter, uid: targetUid });
    }
    console.log(targetUid);
  }, [targetUid]);

  const options = [
    { label: "전체", value: "all" },
    { label: "소설", value: "novel" },
    { label: "시/에세이", value: "poetry_essay" },
    { label: "인문", value: "humanities" },
    { label: "교재", value: "textbook" },
    { label: "만화", value: "comic" },
    { label: "자기개발", value: "self_development" },
    { label: "어린이", value: "children" },
    { label: "취미", value: "hobby" },
  ];

  const handleSelect = (option: any) => {
    console.log("Selected option:", option);
    setFilter({ ...filter, category: option.value });
  };

  // if (isLoading) {
  //   return <Fallback />;
  // }

  return (
    <PostSectionWrapper>
      {isLoading && <LoadingSpinner />}
      <StickyMenu>
        <DropDownSelect
          options={options}
          onSelect={handleSelect}
          placeholder="전체"
        />
      </StickyMenu>
      <BookListBody>
        {isEmpty ? (
          <ListEmpty>첫 도서를 등록해주세요!</ListEmpty>
        ) : (
          bookData?.pages.map((page, pageIndex) => (
            <div key={pageIndex}>
              {page?.books.map((book: any, index) => (
                <BookCard
                  filter={filter}
                  key={book.id}
                  book={book}
                  isOdd={index % 2 === 1}
                  myBook={book.uid === currentUser?.uid}
                />
              ))}
            </div>
          ))
        )}
        <div ref={ref}></div>
      </BookListBody>
    </PostSectionWrapper>
  );
}
const PostSectionWrapper = styled.div`
  width: 100%;
  position: relative;
`;

const BookListBody = styled.div`
  padding: 0 10px;
`;
const StickyMenu = styled.div`
  position: sticky;
  background: #fff;
  top: 50px;
  height: 42px;
  display: flex;
  align-items: center;
  padding: 0 20px;
`;
export default BookList;
