import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createChat } from "../../apis/message";

export default function useCreateChat() {
  const queryClient = useQueryClient();

  const createChatMutation = useMutation({
    mutationFn: ({ userId1, userId2 }: { userId1: string; userId2: string }) =>
      createChat(userId1, userId2),
    onSuccess: (data) => {
      // 채팅 생성 성공 시, 필요에 따라 다음 작업을 수행할 수 있습니다.
      console.log("Chat created successfully:", data);
      // 예를 들어, 다른 쿼리를 업데이트하거나 특정 작업을 수행할 수 있습니다.
      queryClient.invalidateQueries({ queryKey: ["messages"] }); // 채팅 목록 쿼리를 무효화할 예시
    },
    onError: (error) => {
      // 채팅 생성 실패 시, 에러 처리를 할 수 있습니다.
      console.error("Error creating chat:", error);
    },
  });

  return createChatMutation;
}
