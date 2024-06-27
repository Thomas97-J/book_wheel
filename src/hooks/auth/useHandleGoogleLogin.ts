import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleGoogleLogin, signIn } from "../../apis/auth";

export default function useHandleGoogleLogin({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: () => void;
}) {
  const queryClient = useQueryClient();

  const signInMutation = useMutation({
    mutationFn: handleGoogleLogin,
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
