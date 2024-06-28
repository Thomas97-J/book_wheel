import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFollow } from "../../apis/users";

export default function useCreateFollow() {
  const queryClient = useQueryClient();
  const followMutaion = useMutation({
    mutationFn: createFollow,
    onMutate: async (updatedFollow) => {
      await queryClient.cancelQueries({ queryKey: ["follows"] });

      const previousFollow = queryClient.getQueryData(["follows"]);

      queryClient.setQueryData(["follows"], (oldFollow: any) => ({
        ...oldFollow,
        ...updatedFollow,
      }));

      return { previousFollow };
    },
    onError: (err, updatedUser, context) => {
      if (context?.previousFollow) {
        queryClient.setQueryData(["follows"], context.previousFollow);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["follows"] });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["follows"] });
    },
  });

  return followMutaion;
}
