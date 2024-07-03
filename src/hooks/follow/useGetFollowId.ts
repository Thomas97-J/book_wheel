import { useQuery } from "@tanstack/react-query";
import { getFollowId } from "../../apis/follow";

export default function useGetFollowId(from_userId: string, to_userId: string) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["follows", from_userId, to_userId],
    queryFn: () => getFollowId(from_userId, to_userId),
  });
  return { followingId: data, isLoading, isError, error };
}
