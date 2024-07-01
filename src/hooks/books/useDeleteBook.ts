import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBook } from "../../apis/books";

export default function useDeleteBook() {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });
  return deleteMutation;
}
