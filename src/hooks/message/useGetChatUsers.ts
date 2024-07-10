import { useQuery } from "@tanstack/react-query";
import { getChatUsers } from "../../apis/message";

export default function useGetChatUsers(chatId: string) {
  const { data } = useQuery({
    queryKey: ["messages_users", chatId],
    queryFn: () => getChatUsers(chatId),
  });
  return { users: data };
}
