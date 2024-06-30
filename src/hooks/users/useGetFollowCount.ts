import { useQuery } from "@tanstack/react-query";
import { getFollowCount } from "../../apis/users";

export default function useGetFollowCount(uid: string) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["followCount", uid],
    queryFn: () => getFollowCount(uid),
  });
  return { followData: data, isLoading, isError, error };
}
