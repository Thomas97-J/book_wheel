import styled from "styled-components";
import PostCard from "../../../components/mobile/PostCard";
import useInfinitePosts from "../../../hooks/posts/useInfinitePosts";
import _ from "lodash";
import DropDownSelect from "../../../components/common/DropDownSelect";
import LoadingSpinner from "../../../components/mobile/LoadingSpinner";

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

  const options = [
    { label: "도서", value: "book" },
    { label: "취미", value: "hobby" },
    { label: "전체", value: "all" },
  ];

  const handleSelect = (option: any) => {
    console.log("Selected option:", option);
    setCategory(option.value);
  };

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
              viewCount={post.viewCount}
              createdAt={post.createdAt}
              postImage={post?.postImage}
            />
          ))}
        </div>
      ))}
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
  background: #fff;
  top: 50px;
  height: 50px;
  width: 100vw;
  border-bottom: 1px solid #ccc;
  ${(props) =>
    props.$scrolled ? "box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1)" : ""}
`;
export default PostSection;
