import { useQuery } from "@tanstack/react-query";
import { getUserPosts } from "../../apis/posts";

export default function useGetUserPosts(uid: string) {
  const { data, isLoading, error } = useQuery<Post[]>({
    queryKey: ["posts", uid],
    queryFn: () => getUserPosts(uid),
    enabled: !!uid,
  });

  return { postData: data, isLoading, error };
}
