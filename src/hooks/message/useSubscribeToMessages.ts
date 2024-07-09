import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { subscribeToMessages } from "../../apis/message";

export default function useSubscribeToMessages(chatId: string) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!chatId) return;

    const unsubscribe = subscribeToMessages(chatId, (messages: Message[]) => {
      queryClient.setQueryData(["messages", chatId], messages);
    });

    return () => {
      unsubscribe();
    };
  }, [chatId, queryClient]);
}
