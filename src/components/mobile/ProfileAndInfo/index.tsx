import styled from "styled-components";
import { Link } from "react-router-dom";
import { PATH } from "../../../App";
import useGetUserById from "../../../hooks/users/useGetUserById";
import useGetFollowCount from "../../../hooks/follow/useGetFollowCount";
import useGetUserPostsByNickname from "../../../hooks/posts/useGetUserPostsByNickname";
import useGetBooksCountByUid from "../../../hooks/books/useGetBooksCountByUid";
import ProfileImage from "../../common/ProfileImage";
import { useAuth } from "../../../context/AuthContext";
import StartMessageBtn from "../StartMessageBtn";

function ProfileAndInfo({ uid, nickname }: { uid: string; nickname: string }) {
  const { userData, isLoading, error } = useGetUserById(uid);
  const { followData } = useGetFollowCount(uid);
  const { postDatas } = useGetUserPostsByNickname(nickname);
  const { bookcount } = useGetBooksCountByUid(uid);
  const { currentUser } = useAuth();
  const isCurrentUser = currentUser?.uid === uid;
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <UserInfo>
      <TopSection>
        <ProfileImage src={userData?.profileImage} />
        <InfoSection>
          <NickName>{userData?.nickname}</NickName>
          <Biography>{userData?.bio}</Biography>
          <span>
            <UserInfoLink to={`${PATH.follow}?type=following&user=${nickname}`}>
              팔로잉 {followData?.followingCount}명
            </UserInfoLink>
            <UserInfoLink to={`${PATH.follow}?type=followers&user=${nickname}`}>
              팔로워 {followData?.followersCount}명
            </UserInfoLink>
          </span>
        </InfoSection>
      </TopSection>
      <BottomSection>
        <UserInfoLink to={`${PATH.bookshelf}?user=${nickname}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="rgba(0, 0, 0, 1)"
          >
            <path d="M6 22h15v-2H6.012C5.55 19.988 5 19.805 5 19s.55-.988 1.012-1H21V4c0-1.103-.897-2-2-2H6c-1.206 0-3 .799-3 3v14c0 2.201 1.794 3 3 3zM5 8V5c0-.805.55-.988 1-1h13v12H5V8z"></path>
            <path d="M8 6h9v2H8z"></path>
          </svg>
          {isCurrentUser ? "내 책장" : `${userData?.nickname}의 책장`}{" "}
          {bookcount}권
        </UserInfoLink>
        <UserInfoLink to={`${PATH.userPost}?user=${nickname}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="rgba(0, 0, 0, 1)"
          >
            <path d="M18 2H6c-1.103 0-2 .897-2 2v18l8-4.572L20 22V4c0-1.103-.897-2-2-2zm0 16.553-6-3.428-6 3.428V4h12v14.553z"></path>
          </svg>
          작성글 {postDatas?.length}개
        </UserInfoLink>
        {!isCurrentUser && <StartMessageBtn targetUserId={uid} />}
      </BottomSection>
    </UserInfo>
  );
}
const TopSection = styled.div`
  display: flex;
  padding: 10px 0;
`;

const BottomSection = styled.div`
  display: flex;
  flex-direction: column;
`;
const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const UserInfoLink = styled(Link)`
  text-decoration: none;
  color: #000;
  height: 30px;
  display: flex;
  align-items: center;
  svg {
    margin-right: 4px;
  }
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.color.default_green};
  }
`;

const NickName = styled.strong`
  margin-right: 10px;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
`;
const Biography = styled.div`
  font-size: 14px;
  color: #737373;
  margin-bottom: 8px;
`;
const UserInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export default ProfileAndInfo;
