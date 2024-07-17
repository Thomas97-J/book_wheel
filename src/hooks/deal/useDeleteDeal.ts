import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDeal } from "../../apis/deal";

export function useDeleteDeal() {
  const queryClient = useQueryClient();
  const mutationKey = ["deleteDeal"];
  const deleteDealMutation = useMutation({
    mutationKey,
    mutationFn: deleteDeal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deals"] });
    },
  });
  return deleteDealMutation;
}
