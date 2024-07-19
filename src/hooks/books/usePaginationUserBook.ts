import { useEffect, useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getBooksBatchBy10 } from "../../apis/books";

export function usePaginationUserBook(
  uid: string | undefined,
  itemsPerPage: number = 10
) {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState({ uid });

  const fetchBooks = async ({ queryKey }: { queryKey: any }) => {
    const [_, { filter, page }] = queryKey;
    const response = await getBooksBatchBy10({
      pageParam: page - 1,
      filter,
      areaNo: 1,
    });
    return response;
  };

  const { data, isLoading, status } = useQuery({
    queryKey: ["books", { filter, page }],
    queryFn: fetchBooks,
    enabled: !!filter.uid,
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (data) {
      const totalBooks = data.count ?? 0; // Assuming the API returns totalBooks
      setTotalPages(Math.ceil(totalBooks / itemsPerPage));
    }
  }, [data, itemsPerPage]);

  useEffect(() => {
    if (uid) {
      setFilter((prevFilter) => ({ ...prevFilter, uid }));
    }
  }, [uid]);

  return {
    page,
    setPage,
    totalPages,
    data,
    isLoading,
    status,
  };
}
