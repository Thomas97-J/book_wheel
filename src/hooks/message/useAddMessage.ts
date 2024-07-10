import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addMessage } from "../../apis/message";

export default function useAddMessage(chatId: string, receiverUserId: string) {
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: (newMessage: Message) =>
      addMessage(chatId, newMessage, receiverUserId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages", chatId] });
    },
  });

  return addMutation;
}
