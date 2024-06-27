import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePostByIndex } from "../../apis/posts";

export default function useUpdatePostByIndex() {
  const queryClient = useQueryClient();
  const updateMutation = useMutation({
    mutationFn: updatePostByIndex,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post_detail"] });
    },
  });
  return updateMutation;
}
