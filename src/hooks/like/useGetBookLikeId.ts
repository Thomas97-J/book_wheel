import { useQuery } from "@tanstack/react-query";
import { getBookLikeId } from "../../apis/like";

export default function useGetBookLikeId(userId: string, bookId: string) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["book_likes", userId, bookId],
    queryFn: () => getBookLikeId(userId, bookId),
  });

  return { likeId: data, isLoading, isError, error };
}
