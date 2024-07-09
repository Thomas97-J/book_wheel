import { useQuery } from "@tanstack/react-query";
import { getUserChatRooms } from "../../apis/message";

export default function useFetchUserChatRooms(userId: string) {
  return useQuery({
    queryKey: ["messages", userId],
    queryFn: () => getUserChatRooms(userId),
    enabled: !!userId,
  });
}
