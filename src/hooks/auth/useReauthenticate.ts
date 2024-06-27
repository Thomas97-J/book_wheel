import { useMutation } from "@tanstack/react-query";
import { reauthenticate } from "../../apis/auth";

export default function useReauthenticate() {
  const mutation = useMutation({ mutationFn: reauthenticate });
  return mutation;
}
