import { useQuery } from "@tanstack/react-query";
import { getUserFollowers } from "../../apis/users";

export function useGetUserFollowers(uid: string) {
  const { data, isLoading, error } = useQuery<UserData[]>({
    queryKey: ["userFollowers", uid],
    queryFn: () => getUserFollowers(uid),
    staleTime: 1000 * 60 * 5, // 5분 동안 데이터를 신선하게 유지합니다.
  });
  return { followerData: data, isLoading, error };
}
