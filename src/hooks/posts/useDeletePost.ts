import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "../../apis/posts";

export default function useDeletePost() {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
  return deleteMutation;
}
