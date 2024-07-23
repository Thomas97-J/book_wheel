import { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { getUserFollowingBatchBy20 } from "../../apis/follow";

function useInfiniteFollowing(nickname: string) {
  const { ref, inView } = useInView();
  const [isLoading, setIsLoading] = useState(true);

  const {
    data: followingData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["following", nickname],
    queryFn: ({ pageParam }) =>
      getUserFollowingBatchBy20({ nickname, pageParam }),
    getNextPageParam: (lastPage) => lastPage?.nextPage || undefined,
    initialPageParam: null,
    enabled: !!nickname,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (followingData) {
      setIsLoading(false);
    }
  }, [followingData]);

  useEffect(() => {
    if (inView && hasNextPage && !isLoading) {
      fetchNextPage();
      setIsLoading(true);
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return {
    ref,
    followingData,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  };
}

export default useInfiniteFollowing;
