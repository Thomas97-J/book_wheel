import { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { getPostsBatchBy10 } from "../../apis/posts";

function useInfinitePosts(initialCategory: string, areaNo: number) {
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
    queryKey: ["posts", category],
    queryFn: handlePostBatchBy10,
    getNextPageParam: (lastPage) => lastPage?.nextPage || undefined,
    initialPageParam: null,
  });

  useEffect(() => {
    if (postDatas) {
      setIsLoading(false);
    }
  }, [postDatas]);

  function handlePostBatchBy10(params: any) {
    return getPostsBatchBy10({ ...params, category: category, areaNo: areaNo });
  }

  useEffect(() => {
    if (inView && hasNextPage && !isLoading) {
      fetchNextPage();
      setIsLoading(true);
    }
  }, [inView, hasNextPage]);

  return {
    ref,
    postDatas,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    category,
    setCategory,
  };
}

export default useInfinitePosts;
