import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPostWithIndex } from "../../apis/posts";

export default function useCreatePostWithIndex() {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createPostWithIndex,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post_detail"] });
    },
  });

  return createMutation;
}
