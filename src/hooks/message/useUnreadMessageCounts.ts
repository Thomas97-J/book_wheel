import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { subscribeToUnreadMessageCounts } from "../../apis/message";

function useUnreadMessageCounts(userId: string) {
  const {
    data: unreadCounts,
    isLoading,
    error,
    refetch,
  } = useQuery<Record<string, number>>({
    queryKey: ["unreadCounts", userId],
    queryFn: () =>
      new Promise<Record<string, number>>((resolve) => {
        const unsubscribe = subscribeToUnreadMessageCounts(userId, (counts) => {
          resolve(counts);
        });

        return () => {
          unsubscribe();
        };
      }),
    enabled: !!userId,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (userId) {
      refetch();
    }
  }, [userId, refetch]);

  return { unreadCounts, isLoading, error };
}

export default useUnreadMessageCounts;
