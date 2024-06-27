import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getUsersByNickname } from "../../apis/users";

export default function useGetUsersByNickname() {
  const queryClient = useQueryClient();
  const searchMutation = useMutation({
    mutationFn: getUsersByNickname,
    onSuccess: (searchResults) => {
      queryClient.setQueryData(["users_all"], searchResults);
    },
  });
  return searchMutation;
}
