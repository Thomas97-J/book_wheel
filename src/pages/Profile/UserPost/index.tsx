import styled from "styled-components";
import PageWrapper from "../../../assets/styles/PageWrapper";
import { useSearchParams } from "react-router-dom";
import useInfinitePosts from "../../../hooks/posts/useInfinitePosts";
import PostCard from "../../../components/mobile/PostCard";
import DefaultHeader from "../../../components/mobile/headers/DefaultHeader";
import ListEmpty from "../../../components/mobile/ListEmpty";
import MemoizedUserPostHeader from "../../../components/mobile/headers/UserPostHeader";

function UserPost() {
  const [query, setQuery] = useSearchParams();
  const nickname = query.get("user") ?? "";
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
  } = useInfinitePosts("all", 1, nickname);

  const isEmpty =
    !postDatas || (postDatas?.pages[0]?.posts.length === 0 && !isLoading);

  return (
    <UserPostWrapper>
      <MemoizedUserPostHeader />
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
    </UserPostWrapper>
  );
}
const UserPostWrapper = styled(PageWrapper)`
  /* Add your styles here */
`;

export default UserPost;
