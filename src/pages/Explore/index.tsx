import React, { useCallback, useEffect, useMemo } from "react";
import styled from "styled-components";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import UserCard from "./UserCard";
import { getAllUsers, getUsersByNickname } from "../../apis/users";
import { useForm } from "react-hook-form";
import _ from "lodash";

interface Search {
  type: string;
  keyword: string;
}

enum SearchType {
  User = "USER",
  Book = "BOOK",
}
function Explore() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users_all"],
    queryFn: getAllUsers,
    staleTime: Infinity, // 데이터를 다시 가져오지 않도록 설정
  });
  const queryClient = useQueryClient();
  const searchMutation = useMutation({
    mutationFn: getUsersByNickname,
    onSuccess: (searchResults) => {
      queryClient.setQueryData(["users_all"], searchResults);
    },
  });
  const { register, handleSubmit } = useForm<Search>({ mode: "onChange" });

  useEffect(() => {
    console.log("explore", data);
  }, [data]);

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
  if (isError) return <span>Error: {error.message}</span>;

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
      {data && data?.map((user) => <UserCard key={user.id} userInfo={user} />)}
    </ExploreWrapper>
  );
}
const ExploreWrapper = styled.div`
  display: flex;
  width: 100vw;
  flex-direction: column;
  justify-content: center;
`;
const SearchInput = styled.input`
  height: 40px;
  width: 100%;
`;
export default Explore;
