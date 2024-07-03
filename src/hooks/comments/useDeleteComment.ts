import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment } from "../../apis/comments";

export function useDeleteComment(postId: string) {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
    onError: (error: any) => {
      console.error("Error deleting comment: ", error);
    },
  });

  return deleteMutation;
}
