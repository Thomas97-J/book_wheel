import { useEffect, useMemo } from "react";
import styled from "styled-components";
import UserCard from "../../components/mobile/UserCard";
import { useForm } from "react-hook-form";
import _ from "lodash";
import useGetAllUsers from "../../hooks/users/useGetAllUsers";
import useGetUsersByNickname from "../../hooks/users/useGetUsersByNickname";
import PageWrapper from "../../assets/styles/PageWrapper";
import useGetUsersBatchBy10 from "../../hooks/users/useGetUsersBatchBy10";

interface Search {
  type: string;
  keyword: string;
}

enum SearchType {
  User = "USER",
  Book = "BOOK",
}
function Explore() {
  const {
    ref,
    users,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    nickname,
    setNickname,
  } = useGetUsersBatchBy10("");

  const searchMutation = useGetUsersByNickname();
  const { register, handleSubmit } = useForm<Search>({ mode: "onChange" });

  useEffect(() => {
    console.log("explore", users);
  }, [users]);

  const debouncedSearch = useMemo(
    () =>
      _.debounce(async (keyword: string) => {
        setNickname(keyword);
      }, 500),
    [searchMutation]
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
    <ExploreWrapper>
      <form onSubmit={handleSubmit(onSearch)}>
        <SearchInput
          {...register("keyword", { required: true })}
          onChange={(e) => {
            onSearch({ type: SearchType.User, keyword: e.target.value });
          }}
          placeholder="검색어를 입력하세요."
          type="text"
        />
      </form>
      {users?.pages.map((page, pageIndex) => (
        <div key={pageIndex}>
          {page?.users.map((user: any) => (
            <UserCard key={user.id} userInfo={user} />
          ))}
        </div>
      ))}
      <div ref={ref}></div>
    </ExploreWrapper>
  );
}
const ExploreWrapper = styled(PageWrapper)``;
const SearchInput = styled.input`
  height: 40px;
  width: 100%;
`;
export default Explore;
