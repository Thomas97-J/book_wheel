import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePostLike } from "../../apis/like";

export default function useDeletePostLike(userId: string, postId: string) {
  const queryClient = useQueryClient();
  const likeMutation = useMutation({
    mutationFn: deletePostLike,
    onMutate: async (likeId) => {
      const queryKey = ["post_likes", userId, postId];

      await queryClient.cancelQueries({ queryKey: queryKey });
      const previousLikeStatus = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, false);
      return { previousLikeStatus, queryKey };
    },
    onError: (err, likeId, context) => {
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
