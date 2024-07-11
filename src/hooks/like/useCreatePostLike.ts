import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPostLike } from "../../apis/like";

export default function useCreatePostLike(userId: string, postId: string) {
  const queryClient = useQueryClient();
  const likeMutation = useMutation({
    mutationFn: createPostLike,
    onMutate: async (_newLike) => {
      const postLikesQueryKey = ["post_likes", userId, postId];
      const receivedLikesQueryKey = ["received_likes_count", postId];

      await queryClient.cancelQueries({ queryKey: postLikesQueryKey });
      await queryClient.cancelQueries({ queryKey: receivedLikesQueryKey });

      const previousLikeStatus = queryClient.getQueryData(postLikesQueryKey);
      const previousLikesCount = queryClient.getQueryData(
        receivedLikesQueryKey
      );

      queryClient.setQueryData(postLikesQueryKey, true);
      queryClient.setQueryData(
        receivedLikesQueryKey,
        (old: number) => (old ?? 0) + 1
      );

      return {
        previousLikeStatus,
        previousLikesCount,
        postLikesQueryKey,
        receivedLikesQueryKey,
      };
    },
    onError: (_err, _newLike, context) => {
      if (context?.previousLikeStatus) {
        queryClient.setQueryData(
          context.postLikesQueryKey,
          context.previousLikeStatus
        );
      }
      if (context?.previousLikesCount) {
        queryClient.setQueryData(
          context.receivedLikesQueryKey,
          context.previousLikesCount
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["post_likes", userId, postId],
      });
      queryClient.invalidateQueries({
        queryKey: ["received_likes_count", postId],
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["post_likes", userId, postId],
      });
      queryClient.invalidateQueries({
        queryKey: ["received_likes_count", postId],
      });
    },
  });

  return likeMutation;
}
