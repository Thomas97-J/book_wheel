import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../../apis/posts";

export default function useGetAllPosts() {
  const { data, isLoading, error } = useQuery<Post[]>({
    queryKey: ["all_posts"],
    queryFn: () => getAllPosts(),
  });
  return { postDatas: data, isLoading, error };
}
