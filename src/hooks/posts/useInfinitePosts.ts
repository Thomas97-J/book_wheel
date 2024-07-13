import { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { getPostsBatchBy10 } from "../../apis/posts";

function useInfinitePosts(
  initialCategory: string,
  areaNo: number,
  nickname?: string
) {
  const [category, setCategory] = useState(initialCategory);
  const { ref, inView } = useInView();
  const [isLoading, setIsLoading] = useState(true);
  const {
    data: postDatas,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["posts", category, areaNo, nickname],
    queryFn: handlePostBatchBy10,
    getNextPageParam: (lastPage) => lastPage?.nextPage || undefined,
    initialPageParam: null,
    refetchOnWindowFocus: true,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (postDatas) {
      setIsLoading(false);
    }
  }, [postDatas]);

  useEffect(() => {
    if (inView && hasNextPage && !isLoading) {
      fetchNextPage();
      setIsLoading(true);
    }
  }, [inView, hasNextPage]);
  function handlePostBatchBy10(params: any) {
    return getPostsBatchBy10({
      ...params,
      category: category,
      areaNo: areaNo,
      nickname: nickname,
    });
  }

  return {
    ref,
    postDatas,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    category,
    setCategory,
  };
}

export default useInfinitePosts;
