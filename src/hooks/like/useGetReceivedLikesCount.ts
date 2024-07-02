import { useQuery } from "@tanstack/react-query";
import { getReceivedLikesCount } from "../../apis/like";

export default function useGetReceivedLikesCount(postId: string) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["received_likes_count", postId],
    queryFn: () => getReceivedLikesCount(postId),
  });

  return { receivedLikesCount: data, isLoading, isError, error };
}
