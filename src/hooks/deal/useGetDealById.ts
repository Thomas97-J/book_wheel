import { useQuery } from "@tanstack/react-query";
import { getDealById } from "../../apis/deal";

export function useGetDealById(id: string) {
  const queryKey = ["deal", id];
  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: () => getDealById(id),
    enabled: !!id,
  });
  return { dealData: data, isLoading };
}
