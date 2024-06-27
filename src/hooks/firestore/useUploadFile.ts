import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadFile } from "../../apis/firestore";

export default function useUploadFile(uid: string) {
  const queryClient = useQueryClient();

  const uploadMutation = useMutation({
    mutationFn: uploadFile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users", uid] });
    },
  });
  return uploadMutation;
}
