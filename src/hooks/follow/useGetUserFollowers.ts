import { useQuery } from "@tanstack/react-query";
import { getUserFollowers } from "../../apis/follow";

export function useGetUserFollowers(nickname: string) {
  const { data, isLoading, error } = useQuery<UserData[]>({
    queryKey: ["userFollowers", nickname],
    queryFn: () => getUserFollowers(nickname),
  });
  return { followerData: data, isLoading, error };
}
