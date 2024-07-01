import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFollow } from "../../apis/follow";

export default function useDeleteFollow(
  from_userId: string,
  to_userId: string
) {
  const queryClient = useQueryClient();
  const followMutaion = useMutation({
    mutationFn: deleteFollow,
    onMutate: async (followId) => {
      const queryKey = ["follows", from_userId, to_userId];

      await queryClient.cancelQueries({
        queryKey: queryKey,
      });
      const previousFollow = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, null);
      return { previousFollow, queryKey };
    },
    onError: (err, followId, context) => {
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
