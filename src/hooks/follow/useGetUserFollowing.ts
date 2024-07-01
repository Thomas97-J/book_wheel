import { useQuery } from "@tanstack/react-query";
import { getUserFollowing } from "../../apis/follow";

export function useGetUserFollowing(uid: string) {
  const { data, isLoading, error } = useQuery<UserData[]>({
    queryKey: ["userFollowing", uid],
    queryFn: () => getUserFollowing(uid),
  });
  return { followingData: data, isLoading, error };
}
