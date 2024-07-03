import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment } from "../../apis/comments";

export default function useCreateComment(postId: string) {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createComment,
    onMutate: async (newComment) => {
      await queryClient.cancelQueries({ queryKey: ["comments", postId] });

      const previousComments = queryClient.getQueryData<{
        pages: { comments: Comment[] }[];
      }>(["comments", postId]);

      queryClient.setQueryData<{ pages: { comments: Comment[] }[] }>(
        ["comments", postId],
        (old: any) => {
          if (!old) return { pages: [{ comments: [] }], pageParams: [] };
          const firstPage = old.pages[0];
          const optimisticComment = {
            id: "",
            postId,
            uid: newComment.uid,
            content: newComment.content,
            createdAt: new Date().toISOString(),
          };

          return {
            ...old,
            pages: [
              {
                ...firstPage,
                comments: [optimisticComment, ...firstPage.comments],
              },
              ...old.pages.slice(1),
            ],
          };
        }
      );

      return { previousComments };
    },
    onError: (err, newComment, context) => {
      queryClient.setQueryData(["comments", postId], context?.previousComments);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
  });

  return createMutation;
}
