import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment } from "../../apis/comments";
import { v4 as uuidv4 } from "uuid";

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
            id: uuidv4(),
            postId,
            uid: newComment.uid,
            content: newComment.content,
            replies: [],
            createdAt: new Date(),
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
    onError: (_err, _newComment, context) => {
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
