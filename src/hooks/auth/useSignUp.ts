import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signUp } from "../../apis/auth";

export default function useSignUp() {
  const queryClient = useQueryClient();
  const signUpMutation = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["signUp"] });
    },
  });
  return signUpMutation;
}
