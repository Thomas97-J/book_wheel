// import { useEffect, useState } from "react";
// import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
// import { useInView } from "react-intersection-observer";
// import { fetchMessagesBatch, subscribeToMessages } from "../../apis/message";
// import { DocumentData } from "firebase/firestore";

// function useInfiniteMessages(chatId: string) {
//   const { ref, inView } = useInView();
//   const [isLoading, setIsLoading] = useState(true);
//   const queryClient = useQueryClient();
//   const messageDatas;
//   //직접 인피니티스크롤 구현
//   return {
//     ref,
//     messageDatas,
//     isLoading,
//   };
// }

// export default useInfiniteMessages;
