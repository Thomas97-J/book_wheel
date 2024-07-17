import { useQuery } from "@tanstack/react-query";
import { getDealById } from "../../apis/deal";

export function useGetDealById(id: string) {
  const queryKey = ["deal", id];
  const dealQuery = useQuery({
    queryKey,
    queryFn: () => getDealById(id),
    enabled: !!id,
  });
  return dealQuery;
}
