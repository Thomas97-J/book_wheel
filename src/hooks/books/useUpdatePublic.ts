import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePublic } from "../../apis/books";

export const useUpdatePublic = (bookId: string, filter: any) => {
  const queryClient = useQueryClient();
  const bookQuery = ["books", filter];
  return useMutation({
    mutationFn: updatePublic,
    onMutate: async ({ bookId, newIsPublic }) => {
      console.log(newIsPublic, filter);

      await queryClient.cancelQueries({ queryKey: bookQuery });

      const previousBook = queryClient.getQueryData(bookQuery);

      queryClient.setQueryData(bookQuery, (old: any) => ({
        ...old,
        isPublic: newIsPublic,
      }));

      return { previousBook };
    },
    onError: (err, { bookId }, context) => {
      console.log(err);

      queryClient.setQueryData(bookQuery, context?.previousBook);
    },
    onSettled: (_data, _error, { bookId }) => {
      queryClient.invalidateQueries({ queryKey: bookQuery });
    },
  });
};
