import { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { getUserFollowersBatchBy20 } from "../../apis/follow";

function useInfiniteFollowers(nickname: string) {
  const { ref, inView } = useInView();
  const [isLoading, setIsLoading] = useState(true);

  const {
    data: followerData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["followers", nickname],
    queryFn: ({ pageParam }) =>
      getUserFollowersBatchBy20({ nickname, pageParam }),
    getNextPageParam: (lastPage) => lastPage?.nextPage || undefined,
    initialPageParam: null,
    enabled: !!nickname,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (followerData) {
      setIsLoading(false);
    }
  }, [followerData]);

  useEffect(() => {
    if (inView && hasNextPage && !isLoading) {
      fetchNextPage();
      setIsLoading(true);
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return {
    ref,
    followerData,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  };
}

export default useInfiniteFollowers;
