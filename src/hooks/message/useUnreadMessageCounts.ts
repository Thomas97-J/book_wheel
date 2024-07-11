import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { subscribeToUnreadMessageCounts } from "../../apis/message";

function fetchUnreadMessageCounts(
  userId: string
): Promise<Record<string, number>> {
  return new Promise((resolve) => {
    const unsubscribe = subscribeToUnreadMessageCounts(userId, (counts) => {
      resolve(counts);
    });

    return () => {
      unsubscribe();
    };
  });
}

export function useUnreadMessageCounts(userId: string) {
  const {
    data: unreadCounts,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["unreadCounts", userId],
    queryFn: () => fetchUnreadMessageCounts(userId),
    enabled: !!userId,
  });

  useEffect(() => {
    if (userId) {
      refetch();
    }
  }, [userId, refetch]);
  console.log(unreadCounts);

  return { unreadCounts, isLoading, error };
}

export default useUnreadMessageCounts;
