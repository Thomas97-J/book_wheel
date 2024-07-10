import { useMutation, useQueryClient } from "@tanstack/react-query";
import { resetUnreadCount } from "../../apis/message";

export default function useResetUnreadCount(chatId: string, userId: string) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => resetUnreadCount(chatId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["unreadCounts", userId] });
    },
  });

  return mutation;
}
