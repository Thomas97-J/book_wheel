import { useState, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { getBooksBatchBy3 } from "../../apis/books";

function useRollingBooks() {
  const { ref: getRef, inView } = useInView({ threshold: 0.5 });
  const [isLoading, setIsLoading] = useState(true);

  const {
    data: bookData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["books"],
    queryFn: ({ pageParam }) => getBooksBatchBy3(pageParam),
    getNextPageParam: (lastPage) => lastPage.nextPageToken || undefined,
    initialPageParam: null,
  });

  useEffect(() => {
    if (bookData) {
      setIsLoading(false);
    }
  }, [bookData]);

  useEffect(() => {
    if (inView && hasNextPage && !isLoading) {
      fetchNextPage();
      setIsLoading(true);
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return {
    getRef,
    bookData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  };
}

export default useRollingBooks;
