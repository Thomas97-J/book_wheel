import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signIn } from "../../apis/auth";

export default function useSignIn({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: () => void;
}) {
  const queryClient = useQueryClient();

  const signInMutation = useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      onSuccess();
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
    onError: () => {
      onError();
    },
  });

  return signInMutation;
}
