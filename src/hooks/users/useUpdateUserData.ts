import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserData } from "../../apis/users";

export default function useUpdateUserData(uid: string) {
  const queryClient = useQueryClient();

  const userInfoUpdateMutation = useMutation({
    mutationFn: updateUserData,
    onMutate: async (updatedUser) => {
      await queryClient.cancelQueries({ queryKey: ["users", uid] });

      const previousUser = queryClient.getQueryData(["users", uid]);

      queryClient.setQueryData(["users", uid], (oldUser: any) => ({
        ...oldUser,
        ...updatedUser,
      }));

      return { previousUser };
    },
    onError: (err, updatedUser, context) => {
      if (context?.previousUser) {
        queryClient.setQueryData(["users", uid], context.previousUser);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users", uid] });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users", uid] });
    },
  });

  return userInfoUpdateMutation;
}
