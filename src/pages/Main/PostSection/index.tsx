import { useEffect, useRef, useState } from "react";

import styled from "styled-components";
import Fallback from "../../../components/mobile/Fallback";
import PostCard from "./PostCard";
import useGetAllPosts from "../../../hooks/posts/useGetAllPosts";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getPostsBatchBy10 } from "../../../apis/posts";
import DropDownSelect from "../../../components/common/DropDownSelect";
import useInfinitePosts from "../../../hooks/posts/useInfinitePosts";
import _ from "lodash";

function PostSection() {
  const {
    ref,
    postDatas,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    category,
    setCategory,
  } = useInfinitePosts("all");

  const options = [
    { label: "도서", value: "book" },
    { label: "취미", value: "hobby" },
    { label: "전체", value: "all" },
  ];

  const handleSelect = (option: any) => {
    console.log("Selected option:", option);
    setCategory(option.value);
  };

  // if (isLoading) {
  //   return <Fallback />;
  // }

  return (
    <PostSectionWrapper>
      <StickyMenu>
        <DropDownSelect
          options={options}
          onSelect={handleSelect}
          placeholder="전체"
        />
      </StickyMenu>
      {postDatas?.pages.map((page, pageIndex) => (
        <div key={pageIndex}>
          {page?.posts.map((post: any) => (
            <PostCard
              key={post.id}
              id={post.id}
              title={post.title}
              content={post.content}
              uid={post.uid}
              index={post.index}
              createdAt={post.createdAt}
            />
          ))}
        </div>
      ))}
      <div ref={ref}></div>
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
