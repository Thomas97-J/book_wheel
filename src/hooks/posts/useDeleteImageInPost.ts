import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteImageInPost } from "../../apis/posts";

export default function useDeleteImageInPost() {
  const queryClient = useQueryClient();
  const imageDeleteMutation = useMutation({
    mutationFn: deleteImageInPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post_detail"] });
    },
  });
  return imageDeleteMutation;
}
