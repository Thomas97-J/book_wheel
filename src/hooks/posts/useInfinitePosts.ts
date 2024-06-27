import { useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { getPostsBatchBy10 } from "../../apis/posts";
import _ from "lodash";

function useInfinitePosts(initialCategory: string) {
  const [category, setCategory] = useState(initialCategory);
  const { ref, inView } = useInView();
  const [getTrigger, setGetTrigger] = useState(false);
  const {
    data: postDatas,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    status,
  } = useInfiniteQuery({
    queryKey: ["posts", category],
    queryFn: handlePostBatchBy10,
    getNextPageParam: (lastPage) => lastPage?.nextPage || undefined,
    initialPageParam: null,
  });

  useEffect(() => {
    if (postDatas) {
      console.log("get 허용");
      setGetTrigger(true);
    }
  }, [postDatas]);

  function handlePostBatchBy10(params: any) {
    return getPostsBatchBy10({ ...params, category: category });
  }

  useEffect(() => {
    if (inView && hasNextPage && getTrigger) {
      fetchNextPage();
      setGetTrigger(false);
    }
  }, [inView, hasNextPage, fetchNextPage]);

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
