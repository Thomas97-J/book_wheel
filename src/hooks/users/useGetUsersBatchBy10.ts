import { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import {
  getUsersBatchBy10,
  getUsersByNicknameBatchBy10,
} from "../../apis/users";

function useGetUsersBatchBy10(initialNickname: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [nickname, setNickname] = useState(initialNickname ?? "");

  const { ref, inView } = useInView();
  const {
    data: users,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["users", nickname],
    queryFn: handleUsersSearchApi,
    getNextPageParam: (lastPage) => lastPage?.nextPage || undefined,
    initialPageParam: null,
  });

  useEffect(() => {
    if (users) {
      setIsLoading(true);
    }
  }, [users]);

  useEffect(() => {
    if (inView && hasNextPage && isLoading) {
      fetchNextPage();
      setIsLoading(false);
    }
  }, [inView, hasNextPage, fetchNextPage, isLoading]);

  function handleUsersSearchApi(params: any) {
    if (nickname) {
      return getUsersByNicknameBatchBy10({ ...params, nickname: nickname });
    } else {
      return getUsersBatchBy10({ ...params });
    }
  }

  return {
    ref,
    users,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    nickname,
    setNickname,
  };
}

export default useGetUsersBatchBy10;
