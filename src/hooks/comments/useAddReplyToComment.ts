import {
  useMutation,
  useQueryClient,
  MutationFunction,
} from "@tanstack/react-query";
import { addReplyToComment } from "../../apis/comments";

function useAddReplyToComment(commentId: string, postId: string) {
  const queryClient = useQueryClient();

  const mutationFn: MutationFunction<
    string,
    { commentId: string; replyData: { content: string; userId: string } }
  > = ({ commentId, replyData }) => addReplyToComment(commentId, replyData);

  const addReplyMutation = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
  });

  return addReplyMutation;
}

export default useAddReplyToComment;
