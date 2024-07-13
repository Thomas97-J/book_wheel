import styled from "styled-components";
import PageWrapper from "../../../assets/styles/PageWrapper";
import { useSearchParams } from "react-router-dom";
import useInfinitePosts from "../../../hooks/posts/useInfinitePosts";
import PostCard from "../../../components/mobile/PostCard";
import DefaultHeader from "../../../components/mobile/headers/DefaultHeader";

function UserPost() {
  const [query, setQuery] = useSearchParams();
  const nickname = query.get("user") ?? "";
  const {
    ref,
    postDatas,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    category,
    setCategory,
  } = useInfinitePosts("all", 1, nickname);
  return (
    <UserPostWrapper>
      <DefaultHeader />
      {postDatas?.pages.map((page, pageIndex) => (
        <div key={pageIndex}>
          {page?.posts.map((post: any) => (
            <PostCard
              key={post.id}
              id={post.id}
              title={post.title}
              content={post.content}
              uid={post.uid}
              viewCount={post.viewCount}
              index={post.index}
              createdAt={post.createdAt}
            />
          ))}
        </div>
      ))}
      <div ref={ref}></div>
    </UserPostWrapper>
  );
}
const UserPostWrapper = styled(PageWrapper)`
  /* Add your styles here */
`;

export default UserPost;
