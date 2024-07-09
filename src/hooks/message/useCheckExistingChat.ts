import { useQuery } from "@tanstack/react-query";
import { checkExistingChat } from "../../apis/message";

export default function useCheckExistingChat(userId1: string, userId2: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["checkExistingChat", userId1, userId2],
    queryFn: () => checkExistingChat(userId1, userId2),
    enabled: !!userId1 && !!userId2, // userId1과 userId2가 있을 때만 쿼리를 실행합니다.
  });
  const existingChatId = data;
  return existingChatId;
}
