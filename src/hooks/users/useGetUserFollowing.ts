import { useQuery } from "@tanstack/react-query";
import { getUserFollowing } from "../../apis/users";

export function useGetUserFollowing(uid: string) {
  const { data, isLoading, error } = useQuery<UserData[]>({
    queryKey: ["userFollowing", uid],
    queryFn: () => getUserFollowing(uid),
    staleTime: 1000 * 60 * 5, // 5분 동안 데이터를 신선하게 유지합니다.
  });
  return { followingData: data, isLoading, error };
}
