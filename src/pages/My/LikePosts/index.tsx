import { useEffect } from "react";
import useInfiniteLikedPosts from "../../../hooks/like/useInfiniteLikedPosts";
import { useAuth } from "../../../context/AuthContext";
import styled from "styled-components";
import PageWrapper from "../../../assets/styles/PageWrapper";
import PostCard from "../../../components/mobile/PostCard";
import DefaultHeader from "../../../components/mobile/headers/DefaultHeader";
import ListEmpty from "../../../components/mobile/ListEmpty";
import LikePostHeader from "../../../components/mobile/headers/LikePostHeader";

function LikePosts() {
  const { currentUser } = useAuth();
  const {
    ref,
    likedPostsDatas,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteLikedPosts(currentUser?.uid ?? "");
  const isEmpty =
    !likedPostsDatas ||
    (likedPostsDatas?.pages[0]?.likedPostsData.length === 0 && !isLoading);

  useEffect(() => {
    console.log("likedPostsDatas", likedPostsDatas);
  }, [likedPostsDatas]);

  return (
    <LikePostsWrapper>
      <LikePostHeader />
      {isEmpty ? (
        <ListEmpty>게시글에 좋아요를 눌러주세요!</ListEmpty>
      ) : (
        likedPostsDatas?.pages.map((page, pageIndex) => (
          <div key={pageIndex}>
            {page?.likedPostsData.map((post: any) => (
              <PostCard {...post} key={post.id} />
            ))}
          </div>
        ))
      )}
      <div ref={ref}></div>
    </LikePostsWrapper>
  );
}
const LikePostsWrapper = styled(PageWrapper)`
  /* Add your styles here */
`;

export default LikePosts;
