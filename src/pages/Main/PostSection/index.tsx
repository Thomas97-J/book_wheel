import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { getAllPosts } from "../../../apis/posts";

import styled from "styled-components";
import Fallback from "../../../components/mobile/Fallback";
import PostCard from "./PostCard";

const PostSectionWrapper = styled.div`
  height: 100%;
  width: 100%;
  border: solid 1px;
`;

function PostSection() {
  const { data, isLoading, error } = useQuery<Post[]>({
    queryKey: ["all_posts"],
    queryFn: () => getAllPosts(),
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (isLoading) {
    return <Fallback />;
  }

  return (
    <PostSectionWrapper>
      {data?.map((post: Post) => {
        console.log(post);
        return (
          <PostCard
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.content}
            uid={post.uid}
            index={post.index}
            createdAt={post.createdAt}
          />
        );
      })}
    </PostSectionWrapper>
  );
}

export default PostSection;
