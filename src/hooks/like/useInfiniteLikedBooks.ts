import { useInfiniteQuery } from "@tanstack/react-query";
import { getLikedBooksBatchBy10 } from "../../apis/like";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

function useInfiniteLikedBooks(userId: string) {
  const { ref, inView } = useInView();
  const [isLoading, setIsLoading] = useState(true);
  const {
    data: likedBooksDatas,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["likedBooks", userId],
    queryFn: handleLikedBooksBatchBy10,
    getNextPageParam: (lastPage) => lastPage?.nextPage || undefined,
    initialPageParam: null,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (likedBooksDatas) {
      setIsLoading(false);
    }
  }, [likedBooksDatas]);

  function handleLikedBooksBatchBy10(params: any) {
    return getLikedBooksBatchBy10({ ...params, userId: userId });
  }

  useEffect(() => {
    if (inView && hasNextPage && !isLoading) {
      fetchNextPage();
      setIsLoading(true);
    }
  }, [inView, hasNextPage]);

  return {
    ref,
    likedBooksDatas,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  };
}

export default useInfiniteLikedBooks;
