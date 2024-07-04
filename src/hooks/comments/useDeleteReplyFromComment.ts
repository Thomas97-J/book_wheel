import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteReplyFromComment } from "../../apis/comments";

export default function useDeleteReplyFromComment(
  commentId: string,
  postId: string
) {
  const queryClient = useQueryClient();

  const deleteReplyMutation = useMutation({
    mutationFn: (replyId: string) => deleteReplyFromComment(commentId, replyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
  });

  return deleteReplyMutation;
}
