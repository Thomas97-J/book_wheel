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
          {isCurrentUser ? "내 책장" : `${userData?.nickname}의 책장`}{" "}
          {bookcount}권
        </UserInfoLink>
        <UserInfoLink to={`${PATH.userPost}?user=${nickname}`}>
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
  margin-right: 8px;

  cursor: pointer;
  &:hover {
    color: #0056b3;
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
