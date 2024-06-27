import { useQuery } from "@tanstack/react-query";
import { getPostByIndex } from "../../apis/posts";

export default function useGetPostByIndex(postIndex: number) {
  const { data, isLoading, error } = useQuery<Post>({
    queryKey: ["post_detail"],
    queryFn: () => getPostByIndex(postIndex),
    enabled: !!postIndex,
    // staleTime: Infinity, // 데이터를 다시 가져오지 않도록 설정
  });

  return { postData: data, isLoading, error };
}
