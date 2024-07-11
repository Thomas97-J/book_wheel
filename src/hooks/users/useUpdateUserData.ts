import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserData } from "../../apis/users";
import { User } from "firebase/auth";

export default function useUpdateUserData(
  currentUser: User | null | undefined
) {
  const queryClient = useQueryClient();

  const userInfoUpdateMutation = useMutation({
    mutationFn: updateUserData,
    onMutate: async (updatedUser) => {
      await queryClient.cancelQueries({
        queryKey: ["users", currentUser?.uid],
      });

      const previousUser = queryClient.getQueryData([
        "users",
        currentUser?.uid,
      ]);

      queryClient.setQueryData(["users", currentUser?.uid], (oldUser: any) => ({
        ...oldUser,
        ...updatedUser,
      }));

      return { previousUser };
    },
    onError: (_err, _updatedUser, context) => {
      if (context?.previousUser) {
        queryClient.setQueryData(
          ["users", currentUser?.uid],
          context.previousUser
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users", currentUser?.uid] });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users", currentUser?.uid] });
    },
  });

  return userInfoUpdateMutation;
}
