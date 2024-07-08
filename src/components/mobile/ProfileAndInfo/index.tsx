import styled from "styled-components";
import { Link } from "react-router-dom";
import { PATH } from "../../../App";
import useGetUserById from "../../../hooks/users/useGetUserById";
import useGetFollowCount from "../../../hooks/follow/useGetFollowCount";
import useGetUserPostsByNickname from "../../../hooks/posts/useGetUserPostsByNickname";
import useGetBooksCountByUid from "../../../hooks/books/useGetBooksCountByUid";
import ProfileImage from "../../common/ProfileImage";

function ProfileAndInfo({ uid, nickname }: { uid: string; nickname: string }) {
  const { userData, isLoading, error } = useGetUserById(uid);
  const { followData } = useGetFollowCount(uid);
  const { postDatas } = useGetUserPostsByNickname(nickname);
  const { bookcount } = useGetBooksCountByUid(uid);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <UserInfo>
      <TopSection>
        <ProfileImage src={userData?.profileImage} />
        <div>
          <div>
            <UserInfoLink to={`${PATH.follow}?type=following&user=${nickname}`}>
              팔로잉 {followData?.followingCount}
            </UserInfoLink>
            <UserInfoLink to={`${PATH.follow}?type=followers&user=${nickname}`}>
              팔로워 {followData?.followersCount}
            </UserInfoLink>
          </div>
          <div>
            <UserInfoLink to={`${PATH.bookshelf}?user=${nickname}`}>
              내 서재 {bookcount}
            </UserInfoLink>
            <UserInfoLink to={`${PATH.userPost}?user=${nickname}`}>
              작성글 {postDatas?.length}
            </UserInfoLink>
          </div>
        </div>
      </TopSection>
      <div>
        <NameAndBio>
          <NameSection>
            <NickName>{userData?.nickname}</NickName>
          </NameSection>
          <Biography>{userData?.bio}</Biography>
        </NameAndBio>
      </div>
    </UserInfo>
  );
}
const TopSection = styled.div`
  display: flex;
  padding: 10px 0;
`;

const UserInfoLink = styled(Link)`
  text-decoration: none;
  color: #000;
  padding: 4px;
  height: 30px;
  cursor: pointer;
  &:hover {
    color: #0056b3;
  }
`;
const NameAndBio = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
`;
const NameSection = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 4px;
`;
const NickName = styled.span`
  margin-right: 10px;
`;
const Biography = styled.div`
  padding: 4px;
`;
const UserInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export default ProfileAndInfo;
