import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBookWithIndex } from "../../apis/books";

export default function useCreateBookWithIndex() {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createBookWithIndex,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["book_detail"] });
    },
  });

  return createMutation;
}
