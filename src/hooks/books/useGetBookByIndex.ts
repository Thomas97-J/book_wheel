import { useQuery } from "@tanstack/react-query";
import { getBookByIndex } from "../../apis/books";

export default function useGetBookByIndex(bookIndex: number) {
  const { data, isLoading, error } = useQuery<Book>({
    queryKey: ["book_detail", bookIndex],
    queryFn: () => getBookByIndex(bookIndex),
    enabled: !!bookIndex,
  });

  return { bookData: data, isLoading, error };
}
