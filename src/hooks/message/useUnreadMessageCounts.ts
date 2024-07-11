import { useEffect, useState } from "react";
import { subscribeToUnreadMessageCounts } from "../../apis/message";

export function useUnreadMessageCounts(userId: string) {
  const [unreadCounts, setUnreadCounts] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!userId) return;

    setIsLoading(true);

    const unsubscribe = subscribeToUnreadMessageCounts(userId, (counts) => {
      setUnreadCounts(counts);
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [userId]);

  return { unreadCounts, isLoading, error };
}

export default useUnreadMessageCounts;
