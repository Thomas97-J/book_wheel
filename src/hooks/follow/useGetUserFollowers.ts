import { useQuery } from "@tanstack/react-query";
import { getUserFollowers } from "../../apis/follow";

export function useGetUserFollowers(uid: string) {
  const { data, isLoading, error } = useQuery<UserData[]>({
    queryKey: ["userFollowers", uid],
    queryFn: () => getUserFollowers(uid),
  });
  return { followerData: data, isLoading, error };
}
