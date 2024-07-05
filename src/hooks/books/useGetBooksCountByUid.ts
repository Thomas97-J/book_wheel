import { useQuery } from "@tanstack/react-query";
import { getBooksCountByUid } from "../../apis/books";

export default function useGetBooksCountByUid(uid: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["books", uid],
    queryFn: () => getBooksCountByUid(uid),
    enabled: !!uid,
  });

  return { bookcount: data };
}
