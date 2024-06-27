import { useEffect } from "react";

import styled from "styled-components";
import Fallback from "../../../components/mobile/Fallback";
import PostCard from "./PostCard";
import useGetAllPosts from "../../../hooks/posts/useGetAllPosts";

const PostSectionWrapper = styled.div`
  height: 100%;
  width: 100%;
  border: solid 1px;
`;

function PostSection() {
  const { postDatas, isLoading, error } = useGetAllPosts();

  useEffect(() => {
    console.log(postDatas);
  }, [postDatas]);

  if (isLoading) {
    return <Fallback />;
  }

  return (
    <PostSectionWrapper>
      {postDatas?.map((post: Post) => {
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
