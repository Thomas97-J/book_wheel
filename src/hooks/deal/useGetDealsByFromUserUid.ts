import { useQuery } from "@tanstack/react-query";
import { getDealsByFromUserUid } from "../../apis/deal";

export function useGetDealsByFromUserUid(uid: string) {
  const queryKey = ["deals", "fromUser", uid];
  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: () => getDealsByFromUserUid(uid),
    enabled: !!uid,
  });
  return { sendDealDatas: data, isLoading };
}
