import { useEffect, useState } from "react";
import { subscribeToUserChatRooms } from "../../apis/message";

export function useUserChatRooms(userId: string) {
  const [chatRooms, setChatRooms] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!userId) return;

    setIsLoading(true);

    const unsubscribe = subscribeToUserChatRooms(userId, (chats) => {
      setChatRooms(chats);
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [userId]);

  return { chatRooms, isLoading, error };
}

export default useUserChatRooms;
