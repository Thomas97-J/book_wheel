import { useMutation, useQueryClient } from "@tanstack/react-query";
import { passwordUpdate } from "../../apis/auth";

export default function usePasswordUpdate() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: passwordUpdate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["password_change"] });
    },
  });

  return mutation;
}
