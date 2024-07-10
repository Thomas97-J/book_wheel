import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { subscribeToUserChatRooms } from "../../apis/message";

export function useUserChatRooms(userId: string) {
  const fetchChatRooms = async () => {
    return new Promise<any[]>((resolve) => {
      subscribeToUserChatRooms(userId, (chats) => {
        resolve(chats);
      });
    });
  };

  const {
    data: chatRooms,
    isLoading,
    error,
  } = useQuery({ queryKey: ["chatRooms", userId], queryFn: fetchChatRooms });

  return { chatRooms, isLoading, error };
}
