import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import styled from "styled-components";
import { getPostById } from "../../apis/posts";
import { useSearchParams } from "react-router-dom";
import Fallback from "../../components/mobile/Fallback";
import UserInfo from "./UserInfo";

const PostDetailWrapper = styled.div`
  /* Add your styles here */
`;

function PostDetail() {
  const [query, setQuery] = useSearchParams();
  const postId = query.get("id") ?? "";
  const { data, isLoading, error } = useQuery<Post>({
    queryKey: ["post_detail"],
    queryFn: () => getPostById(postId),
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (isLoading) {
    return <Fallback />;
  }
  return (
    <PostDetailWrapper>
      <UserInfo uid={data?.uid || ""} />
      <h2>{data?.title}</h2>
      <div>{data?.content}</div>
    </PostDetailWrapper>
  );
}

export default PostDetail;
