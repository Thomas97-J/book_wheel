import { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { getBooksBatchBy10 } from "../../apis/books";

function useInfiniteBooks(initialFilter: any, areaNo: number) {
  const [filter, setFilter] = useState(initialFilter);
  const { ref, inView } = useInView();
  const [isLoading, setIsLoading] = useState(true);

  const {
    data: bookData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["books", filter],
    queryFn: handleBooksBatchBy10,
    getNextPageParam: (lastPage) => lastPage?.nextPage || undefined,
    initialPageParam: null,
  });

  useEffect(() => {
    if (bookData) {
      setIsLoading(false);
    }
  }, [bookData]);

  function handleBooksBatchBy10(params: any) {
    return getBooksBatchBy10({ ...params, filter: filter, areaNo: areaNo });
  }

  useEffect(() => {
    if (inView && hasNextPage && !isLoading) {
      fetchNextPage();
      setIsLoading(true);
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return {
    ref,
    bookData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    filter,
    setFilter,
  };
}

export default useInfiniteBooks;
