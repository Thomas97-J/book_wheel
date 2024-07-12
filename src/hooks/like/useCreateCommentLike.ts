import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCommentLike } from "../../apis/like";

export default function useCreateCommentLike(
  userId: string,
  commentId: string
) {
  const queryClient = useQueryClient();

  const likeMutation = useMutation({
    mutationFn: createCommentLike,
    onMutate: async () => {
      const commentLikesQueryKey = ["comment_likes", userId, commentId];
      const receivedLikesQueryKey = ["received_comment_likes_count", commentId];

      await queryClient.cancelQueries({ queryKey: commentLikesQueryKey });
      await queryClient.cancelQueries({ queryKey: receivedLikesQueryKey });

      const previousLikeStatus = queryClient.getQueryData(commentLikesQueryKey);
      const previousLikesCount = queryClient.getQueryData(
        receivedLikesQueryKey
      );

      queryClient.setQueryData(commentLikesQueryKey, true);
      queryClient.setQueryData(
        receivedLikesQueryKey,
        (old: number) => (old ?? 0) + 1
      );

      return {
        previousLikeStatus,
        previousLikesCount,
        commentLikesQueryKey,
        receivedLikesQueryKey,
      };
    },

    onError: (_err, _newLike, context) => {
      if (context?.previousLikeStatus) {
        queryClient.setQueryData(
          context.commentLikesQueryKey,
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
        queryKey: ["comment_likes", userId, commentId],
      });
      queryClient.invalidateQueries({
        queryKey: ["received_likes_count", commentId],
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["comment_likes", userId, commentId],
      });
      queryClient.invalidateQueries({
        queryKey: ["received_likes_count", commentId],
      });
    },
  });

  return likeMutation;
}
