import { useInfiniteQuery } from "@tanstack/react-query";
import { getLikedPostsBatchBy10 } from "../../apis/like";

function useInfiniteLikedPosts(userId: string) {
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

  function handleLikedPostsBatchBy10(params: any) {
    return getLikedPostsBatchBy10({ ...params, userId: userId });
  }

  return {
    likedPostsDatas,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  };
}

export default useInfiniteLikedPosts;
