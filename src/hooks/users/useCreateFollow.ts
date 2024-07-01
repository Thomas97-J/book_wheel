import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFollow } from "../../apis/users";

export default function useCreateFollow(
  from_userId: string,
  to_userId: string
) {
  const queryClient = useQueryClient();
  const followMutaion = useMutation({
    mutationFn: createFollow,
    onMutate: async (updatedFollow) => {
      const queryKey = ["follows", from_userId, to_userId];

      await queryClient.cancelQueries({
        queryKey: queryKey,
      });
      const previousFollow = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, (oldFollow: any) => ({
        ...oldFollow,
        ...updatedFollow,
      }));

      return { previousFollow, queryKey };
    },
    onError: (err, updatedUser, context) => {
      if (context?.previousFollow) {
        queryClient.setQueryData(context.queryKey, context.previousFollow);
      }
    },
    onSuccess: () => {
      const queryKey = ["follows", from_userId, to_userId];
      queryClient.invalidateQueries({ queryKey: queryKey });
    },
    onSettled: () => {
      const queryKey = ["follows", from_userId, to_userId];
      queryClient.invalidateQueries({ queryKey: queryKey });
    },
  });

  return followMutaion;
}
