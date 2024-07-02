import { useInfiniteQuery } from "@tanstack/react-query";
import { getLikedPostsBatchBy10 } from "../../apis/like";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

function useInfiniteLikedPosts(userId: string) {
  const { ref, inView } = useInView();
  const [isLoading, setIsLoading] = useState(true);
  const {
    data: likedPostsDatas,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["likedPosts", userId],
    queryFn: handleLikedPostsBatchBy10,
    getNextPageParam: (lastPage) => lastPage?.nextPage || undefined,
    initialPageParam: null,
  });

  useEffect(() => {
    if (likedPostsDatas) {
      setIsLoading(false);
    }
  }, [likedPostsDatas]);

  function handleLikedPostsBatchBy10(params: any) {
    return getLikedPostsBatchBy10({ ...params, userId: userId });
  }

  useEffect(() => {
    if (inView && hasNextPage && !isLoading) {
      fetchNextPage();
      setIsLoading(true);
    }
  }, [inView, hasNextPage]);

  return {
    ref,
    likedPostsDatas,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  };
}

export default useInfiniteLikedPosts;
