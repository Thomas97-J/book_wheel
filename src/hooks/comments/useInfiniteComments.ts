import { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { getCommentsBatchBy20 } from "../../apis/comments";

function useInfiniteComments(postId: string) {
  const { ref, inView } = useInView();
  const [isLoading, setIsLoading] = useState(true);

  const {
    data: commentData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["comments", postId],
    queryFn: handleCommentsBatchBy20,
    getNextPageParam: (lastPage) => lastPage?.nextPage || undefined,
    initialPageParam: null,
  });

  useEffect(() => {
    if (commentData) {
      setIsLoading(false);
    }
  }, [commentData]);

  function handleCommentsBatchBy20(params: any) {
    return getCommentsBatchBy20({
      ...params,
      postId: postId,
    });
  }

  useEffect(() => {
    if (inView && hasNextPage && !isLoading) {
      fetchNextPage();
      setIsLoading(true);
    }
  }, [inView, hasNextPage]);

  return {
    ref,
    commentData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  };
}

export default useInfiniteComments;
