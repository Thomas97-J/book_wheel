import { useQuery } from "@tanstack/react-query";
import { getReceivedCommentLikesCount } from "../../apis/like";

export default function useGetReceivedCommentLikesCount(commentId: string) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["received_comment_likes_count", commentId],
    queryFn: () => getReceivedCommentLikesCount(commentId),
  });

  return { receivedLikesCount: data, isLoading, isError, error };
}
