import { useQuery } from "@tanstack/react-query";
import { getUidByNickname } from "../../apis/users";

export default function useGetUidByNickname(nickname: string) {
  const { data } = useQuery({
    queryKey: ["nicknameToUid", nickname],
    queryFn: () => getUidByNickname(nickname),
    enabled: !!nickname,
  });
  return { targetUid: data, isLoading: !!data };
}
