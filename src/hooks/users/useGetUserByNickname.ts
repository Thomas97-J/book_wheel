import { useQuery } from "@tanstack/react-query";
import { getUserByNickname } from "../../apis/users";

export default function useGetUserByNickname(nickname: string) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUserByNickname(nickname),
  });
  return { userData: data, isLoading, isError, error };
}
