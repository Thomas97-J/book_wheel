import { useQuery } from "@tanstack/react-query";
import { getPostLikeId } from "../../apis/like";

export default function useGetPostLikeId(userId: string, postId: string) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["post_likes", userId, postId],
    queryFn: () => getPostLikeId(userId, postId),
  });

  return { likeId: data, isLoading, isError, error };
}
