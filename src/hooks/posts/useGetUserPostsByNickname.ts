import { useQuery } from "@tanstack/react-query";
import { getUserPostsByNickname } from "../../apis/posts";

export default function useGetUserPostsByNickname(nickname: string) {
  const { data, isLoading, error } = useQuery<Post[]>({
    queryKey: ["posts", nickname],
    queryFn: () => getUserPostsByNickname(nickname),
    enabled: !!nickname,
  });

  return { postDatas: data, isLoading, error };
}
