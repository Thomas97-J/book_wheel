import styled from "styled-components";
import PostCard from "../../../components/mobile/PostCard";
import useInfinitePosts from "../../../hooks/posts/useInfinitePosts";
import _ from "lodash";
import DropDownSelect from "../../../components/common/DropDownSelect";
import LoadingSpinner from "../../../components/mobile/LoadingSpinner";
import ListEmpty from "../../../components/mobile/ListEmpty";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function PostSection({
  topRef,
  needBottomLine,
}: {
  topRef: any;
  needBottomLine: boolean;
}) {
  const {
    ref,
    postDatas,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    category,
    setCategory,
  } = useInfinitePosts("all", 1);
  const isEmpty = postDatas?.pages[0]?.posts.length === 0 && !isLoading;
  const location = useLocation();

  const options = [
    { label: "도서", value: "book" },
    { label: "취미", value: "hobby" },
    { label: "전체", value: "all" },
  ];

  const handleSelect = (option: any) => {
    console.log("Selected option:", option);
    setCategory(option.value);
  };

  useEffect(() => {
    const scrollTarget = sessionStorage.getItem(`scrollTarget-/post`);
    if (scrollTarget) {
      let elem = document.getElementById(scrollTarget);
      if (elem) {
        elem.scrollIntoView({ block: "center" });
      }
    }
  }, [location]);

  console.log("postDatas", postDatas);

  return (
    <PostSectionWrapper>
      {isLoading && <LoadingSpinner />}
      <StickyRef ref={topRef}></StickyRef>
      <StickyMenu $scrolled={!needBottomLine}>
        <DropDownSelect
          options={options}
          onSelect={handleSelect}
          placeholder="전체"
        />
      </StickyMenu>
      {isEmpty ? (
        <ListEmpty>첫 게시글을 작성해주세요!</ListEmpty>
      ) : (
        postDatas?.pages.map((page, pageIndex) => (
          <div key={pageIndex}>
            {page?.posts.map((post: any) => (
              <PostCard {...post} key={post.id} />
            ))}
          </div>
        ))
      )}
      <div ref={ref}></div>
    </PostSectionWrapper>
  );
}

const StickyRef = styled.div`
  position: absolute;
  top: -60px;
`;

const PostSectionWrapper = styled.div`
  min-height: 70vh;
  width: 100%;
  position: relative;
`;
const StickyMenu = styled.div<{ $scrolled: boolean }>`
  position: sticky;
  z-index: 100;
  padding: 0 20px;
  display: flex;
  align-items: center;
  background: #fff;
  top: 50px;
  height: 50px;
  width: 100vw;
  max-width: 600px;
  border-bottom: 1px solid #ccc;
  ${(props) =>
    props.$scrolled ? "box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1)" : ""}
`;
export default PostSection;
