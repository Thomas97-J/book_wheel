import { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { getUsersBatchBy20 } from "../../apis/users";

function useInfiniteUsers(initialNickname: string) {
  const [isLoading, setIsLoading] = useState(true);
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
      setIsLoading(false);
    }
  }, [users]);

  useEffect(() => {
    if (inView && hasNextPage && !isLoading) {
      fetchNextPage();
      setIsLoading(false);
    }
  }, [inView, hasNextPage]);

  function handleUsersSearchApi(params: any) {
    return getUsersBatchBy20({ ...params, nickname: nickname });
  }

  return {
    ref,
    users,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    nickname,
    setNickname,
  };
}

export default useInfiniteUsers;
