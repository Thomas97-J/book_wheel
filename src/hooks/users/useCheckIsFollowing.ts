import { useQuery } from "@tanstack/react-query";
import { checkIsFollowing } from "../../apis/users";

export default function useCheckIsFollowing(
  from_userId: string,
  to_userId: string
) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["follows", from_userId, to_userId],
    queryFn: () => checkIsFollowing(from_userId, to_userId),
  });
  return { followingId: data, isLoading, isError, error };
}
