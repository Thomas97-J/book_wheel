import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { subscribeToUserChatRooms } from "../../apis/message";

export default function useSubscribeChatRooms(userId: string) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!userId) return;

    const unsubscribe = subscribeToUserChatRooms(userId, (chats) => {
      queryClient.setQueryData(["chatRooms", userId], chats);
    });

    // 컴포넌트 언마운트 시 구독 해제
    return () => {
      unsubscribe();
    };
  }, [userId, queryClient]);
}
