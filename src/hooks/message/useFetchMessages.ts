import { useQuery } from "@tanstack/react-query";
import { fetchMessages } from "../../apis/message";
import useSubscribeToMessages from "./useSubscribeToMessages";

export default function useFetchMessages(chatId: string) {
  useSubscribeToMessages(chatId);

  return useQuery({
    queryKey: ["messages", chatId],
    queryFn: () => fetchMessages(chatId, null),
  });
}
