import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDeal } from "../../apis/deal";

export function useUpdateDeal(id: string) {
  const queryClient = useQueryClient();
  const mutationKey = ["updateDeal", id];
  const updateDealMutation = useMutation({
    mutationKey,
    mutationFn: (updatedDeal: Partial<Deal>) => updateDeal(id, updatedDeal),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deals"] });
      queryClient.invalidateQueries({ queryKey: ["deal", id] });
    },
  });
  return updateDealMutation;
}
