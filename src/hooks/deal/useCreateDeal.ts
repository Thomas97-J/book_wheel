import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDeal } from "../../apis/deal";

export function useCreateDeal() {
  const queryClient = useQueryClient();
  const mutationKey = ["createDeal"];
  const createDealMutation = useMutation({
    mutationKey,
    mutationFn: createDeal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deals"] });
    },
  });
  return createDealMutation;
}
