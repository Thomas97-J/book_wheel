import { useEffect, useMemo } from "react";
import styled from "styled-components";
import UserCard from "../../components/mobile/UserCard";
import { useForm } from "react-hook-form";
import _ from "lodash";
import useGetAllUsers from "../../hooks/users/useGetAllUsers";
import useGetUsersByNickname from "../../hooks/users/useGetUsersByNickname";
import PageWrapper from "../../assets/styles/PageWrapper";

interface Search {
  type: string;
  keyword: string;
}

enum SearchType {
  User = "USER",
  Book = "BOOK",
}
function Explore() {
  const { userDatas, isLoading, isError, error } = useGetAllUsers();
  const searchMutation = useGetUsersByNickname();
  const { register, handleSubmit } = useForm<Search>({ mode: "onChange" });

  useEffect(() => {
    console.log("explore", userDatas);
  }, [userDatas]);

  const debouncedSearch = useMemo(
    () =>
      _.debounce(async (keyword: string) => {
        await searchMutation.mutateAsync(keyword);
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
  if (isLoading) return <span>Loading...</span>;
  if (isError) return <span>Error: {error?.message}</span>;

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
      {userDatas &&
        userDatas?.map((user) => <UserCard key={user.id} userInfo={user} />)}
    </ExploreWrapper>
  );
}
const ExploreWrapper = styled(PageWrapper)``;
const SearchInput = styled.input`
  height: 40px;
  width: 100%;
`;
export default Explore;
