import { useQuery } from "@tanstack/react-query";
import { getCommentCount } from "../../apis/comments";

export default function useGetCommentCount(postId: string) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["comment_count", postId],
    queryFn: () => getCommentCount(postId),
  });

  return { commentCount: data, isLoading, isError, error };
}
