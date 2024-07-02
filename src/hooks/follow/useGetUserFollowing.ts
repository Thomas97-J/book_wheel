import { useQuery } from "@tanstack/react-query";
import { getUserFollowing } from "../../apis/follow";

export function useGetUserFollowing(nickname: string) {
  const { data, isLoading, error } = useQuery<UserData[]>({
    queryKey: ["userFollowing", nickname],
    queryFn: () => getUserFollowing(nickname),
  });
  return { followingData: data, isLoading, error };
}
