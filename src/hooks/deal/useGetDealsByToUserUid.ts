import { useQuery } from "@tanstack/react-query";
import { getDealsByToUserUid } from "../../apis/deal";

export function useGetDealsByToUserUid(uid: string) {
  const queryKey = ["deals", "toUser", uid];
  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: () => getDealsByToUserUid(uid),
    enabled: !!uid,
  });
  return { receivedDealDatas: data, isLoading };
}
