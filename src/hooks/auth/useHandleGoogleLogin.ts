import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleGoogleLogin } from "../../apis/auth";

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
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      onSuccess();
    },
    onError: () => {
      onError();
    },
  });

  return signInMutation;
}
