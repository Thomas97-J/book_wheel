import { useEffect, useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getBooksBatch } from "../../apis/books";
import useGetBooksCountByUid from "./useGetBooksCountByUid";

export function usePaginationUserBook(
  uid: string | undefined,
  itemsPerPage: number = 5
) {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState<any>({ uid });
  const { bookcount } = useGetBooksCountByUid(uid ?? "");
  const [pagingBook, setPagingBook] = useState<any>([[]]);
  const selectBookLength = filter?.indexes?.length;
  const fetchBooks = async ({ queryKey }: { queryKey: any }) => {
    const [_, { filter }] = queryKey;
    const response = await getBooksBatch({
      filter,
      areaNo: 1,
    });
    return response;
  };

  const { data, isLoading, status } = useQuery({
    queryKey: ["books", { filter }],
    queryFn: fetchBooks,
    enabled: !!filter.uid,
    placeholderData: keepPreviousData,
  });
  function chunk(data: Book[] = [], size = 1) {
    const arr = [];

    for (let i = 0; i < data.length; i += size) {
      arr.push(data.slice(i, i + size));
    }

    return arr;
  }
  useEffect(() => {
    if (data) {
      console.log(selectBookLength);

      const totalBooks = (selectBookLength || bookcount) ?? 0; //선택된 책이 있는 경우 그 데이터 받아옴
      console.log(totalBooks, data);
      setPagingBook(chunk(data.books as Book[], 5));
      setTotalPages(Math.ceil(totalBooks / itemsPerPage));
    }
  }, [data, itemsPerPage]);

  useEffect(() => {
    if (uid) {
      setFilter((prevFilter: any) => ({ ...prevFilter, uid }));
    }
  }, [uid]);

  return {
    page,
    setPage,
    totalPages,
    filter,
    setFilter,
    data: pagingBook[page - 1],
    isLoading,
    status,
  };
}
