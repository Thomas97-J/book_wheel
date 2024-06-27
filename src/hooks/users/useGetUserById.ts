import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../../apis/users";

export default function useGetUserById(uid: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["user_profile", uid],
    queryFn: () => getUserById(uid),
  });
  return { userData: data, isLoading, error };
}
