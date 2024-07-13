import { useEffect } from "react";
import useInfiniteLikedPosts from "../../../hooks/like/useInfiniteLikedPosts";
import { useAuth } from "../../../context/AuthContext";
import styled from "styled-components";
import PageWrapper from "../../../assets/styles/PageWrapper";
import PostCard from "../../../components/mobile/PostCard";
import DefaultHeader from "../../../components/mobile/headers/DefaultHeader";

function LikePosts() {
  const { currentUser } = useAuth();
  const {
    ref,
    likedPostsDatas,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteLikedPosts(currentUser?.uid ?? "");

  useEffect(() => {
    console.log("likedPostsDatas", likedPostsDatas);
  }, [likedPostsDatas]);

  return (
    <LikePostsWrapper>
      <DefaultHeader />
      {likedPostsDatas?.pages.map((page, pageIndex) => (
        <div key={pageIndex}>
          {page?.likedPostsData.map((post: any) => (
            <PostCard
              key={post.id}
              id={post.id}
              title={post.title}
              content={post.content}
              uid={post.uid}
              index={post.index}
              viewCount={post.viewCount}
              createdAt={post.createdAt}
            />
          ))}
        </div>
      ))}
      <div ref={ref}></div>
    </LikePostsWrapper>
  );
}
const LikePostsWrapper = styled(PageWrapper)`
  /* Add your styles here */
`;

export default LikePosts;
