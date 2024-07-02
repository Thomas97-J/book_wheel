import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPostLike } from "../../apis/like";

export default function useCreatePostLike(userId: string, postId: string) {
  const queryClient = useQueryClient();
  const likeMutation = useMutation({
    mutationFn: createPostLike,
    onMutate: async (newLike) => {
      const queryKey = ["post_likes", userId, postId];

      await queryClient.cancelQueries({ queryKey: queryKey });

      const previousLikeStatus = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, true);

      return { previousLikeStatus, queryKey };
    },
    onError: (err, newLike, context) => {
      if (context?.previousLikeStatus) {
        queryClient.setQueryData(context.queryKey, context.previousLikeStatus);
      }
    },
    onSuccess: () => {
      const queryKey = ["post_likes", userId, postId];
      queryClient.invalidateQueries({ queryKey: queryKey });
    },
    onSettled: () => {
      const queryKey = ["post_likes", userId, postId];
      queryClient.invalidateQueries({ queryKey: queryKey });
    },
  });

  return likeMutation;
}
