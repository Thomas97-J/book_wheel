import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBookByIndex } from "../../apis/books";

export default function useUpdateBookByIndex() {
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: updateBookByIndex,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["book_detail"] });
    },
  });

  return updateMutation;
}
