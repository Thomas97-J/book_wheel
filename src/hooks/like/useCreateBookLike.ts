import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBookLike } from "../../apis/like";

export default function useCreateBookLike(userId: string, bookId: string) {
  const queryClient = useQueryClient();
  const likeMutation = useMutation({
    mutationFn: createBookLike,
    onMutate: async (_newLike) => {
      const bookLikesQueryKey = ["book_likes", userId, bookId];
      const receivedLikesQueryKey = ["received_likes_count", bookId];

      await queryClient.cancelQueries({ queryKey: bookLikesQueryKey });
      await queryClient.cancelQueries({ queryKey: receivedLikesQueryKey });

      const previousLikeStatus = queryClient.getQueryData(bookLikesQueryKey);
      const previousLikesCount = queryClient.getQueryData(
        receivedLikesQueryKey
      );

      queryClient.setQueryData(bookLikesQueryKey, true);
      queryClient.setQueryData(
        receivedLikesQueryKey,
        (old: number) => (old ?? 0) + 1
      );

      return {
        previousLikeStatus,
        previousLikesCount,
        bookLikesQueryKey,
        receivedLikesQueryKey,
      };
    },
    onError: (_err, _newLike, context) => {
      if (context?.previousLikeStatus) {
        queryClient.setQueryData(
          context.bookLikesQueryKey,
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
        queryKey: ["book_likes", userId, bookId],
      });
      queryClient.invalidateQueries({
        queryKey: ["received_likes_count", bookId],
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["book_likes", userId, bookId],
      });
      queryClient.invalidateQueries({
        queryKey: ["received_likes_count", bookId],
      });
    },
  });

  return likeMutation;
}
