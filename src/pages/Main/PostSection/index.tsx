import { useEffect } from "react";

import styled from "styled-components";
import Fallback from "../../../components/mobile/Fallback";
import PostCard from "./PostCard";
import useGetAllPosts from "../../../hooks/posts/useGetAllPosts";

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
      <StickyMenu>카테고리</StickyMenu>
      {postDatas?.map((post: Post) => {
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
const PostSectionWrapper = styled.div`
  min-height: 70vh;
  width: 100%;
  border: solid 1px;
  position: relative;
`;
const StickyMenu = styled.div`
  position: sticky;
  background: #fff;
  top: 60px;
  height: 50px;
`;
export default PostSection;
