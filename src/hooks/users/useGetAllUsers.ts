import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../apis/users";

export default function useGetAllUsers() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users_all"],
    queryFn: getAllUsers,
    staleTime: Infinity, // 데이터를 다시 가져오지 않도록 설정
  });
  return { userDatas: data, isLoading, isError, error };
}
