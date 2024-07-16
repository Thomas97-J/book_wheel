import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProfileImage } from "../../apis/users";

export default function useDeleteProfileImage(uid: string) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteProfileImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user_profile", uid] });
    },
    onError: (error: any) => {
      console.error("Error deleting profile image:", error);
    },
  });

  return mutation;
}
