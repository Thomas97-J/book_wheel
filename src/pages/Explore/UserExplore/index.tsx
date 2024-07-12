import { useMemo } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import _ from "lodash";
import useInfiniteUsers from "../../../hooks/users/useInfiniteUsers";
import UserCard from "../../../components/mobile/UserCard";
import LoadingSpinner from "../../../components/mobile/LoadingSpinner";
interface Search {
  type: string;
  keyword: string;
}

enum SearchType {
  User = "USER",
  Book = "BOOK",
}
function UserExplore() {
  const { ref, users, isLoading, setNickname } = useInfiniteUsers("");

  const { register, handleSubmit } = useForm<Search>({ mode: "onChange" });

  const debouncedSearch = useMemo(
    () =>
      _.debounce(async (keyword: string) => {
        setNickname(keyword);
      }, 500),
    []
  );

  async function onSearch(data: Search) {
    try {
      if (data.type === SearchType.User) {
        await debouncedSearch(data.keyword);
      }
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <UserExploreWrapper>
      {isLoading && <LoadingSpinner />}
      <SearchForm onSubmit={handleSubmit(onSearch)}>
        <SearchInput
          {...register("keyword", { required: true })}
          onChange={(e) => {
            onSearch({ type: SearchType.User, keyword: e.target.value });
          }}
          placeholder="검색어를 입력하세요."
          type="text"
        />
      </SearchForm>
      {users?.pages.map((page, pageIndex) => (
        <div key={pageIndex}>
          {page?.users.map((user: any) => (
            <UserCard key={user.id} userInfo={user} />
          ))}
        </div>
      ))}
      <div ref={ref}></div>
    </UserExploreWrapper>
  );
}

const UserExploreWrapper = styled.div`
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
export default UserExplore;
