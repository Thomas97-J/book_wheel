import { useQuery } from "@tanstack/react-query";
import { getCommentLikeId } from "../../apis/like";

export default function useGetCommentLikeId(userId: string, commentId: string) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["comment_likes", userId, commentId],
    queryFn: () => getCommentLikeId(userId, commentId),
  });

  return { likeId: data, isLoading, isError, error };
}
