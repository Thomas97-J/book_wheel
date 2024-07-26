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
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import FollowBtn from "../FollowBtn";

function ProfileAndInfo({ uid, nickname }: { uid: string; nickname: string }) {
  const { userData, isLoading, error } = useGetUserById(uid);
  const { followData } = useGetFollowCount(uid);
  const { postDatas } = useGetUserPostsByNickname(nickname);
  const { bookcount } = useGetBooksCountByUid(uid);
  const { currentUser } = useAuth();
  const isCurrentUser = currentUser?.uid === uid;
  if (isLoading)
    return (
      <UserInfo>
        <TopSection>
          <Skeleton
            style={{ marginBottom: "2px", marginRight: "10px" }}
            circle={true}
            height={100}
            width={100}
          />
          <Skeleton
            style={{ margin: "4px" }}
            height={24}
            width={200}
            count={3}
          />
        </TopSection>
        <BottomSection>
          <Skeleton
            style={{ margin: "4px" }}
            height={24}
            width={250}
            count={2}
          />
        </BottomSection>
      </UserInfo>
    );
  if (error) return <div>Error: {error.message}</div>;

  return (
    <UserInfo>
      <TopSection>
        <ProfileImage src={userData?.profileImage} />
        <InfoSection>
          <NickName>
            {userData?.nickname}{" "}
            <FollowBtn
              currentUid={currentUser?.uid ?? ""}
              targetUid={uid ?? ""}
            />
            <StartMessageBtn targetUserId={uid} />
          </NickName>
          {userData?.bio && <Biography>{userData?.bio}</Biography>}
          <FollowTextWrapper>
            <UserInfoLink to={`${PATH.follow}?type=following&user=${nickname}`}>
              팔로잉 <UnderLine>{followData?.followingCount}</UnderLine>
            </UserInfoLink>
            <UserInfoLink to={`${PATH.follow}?type=followers&user=${nickname}`}>
              팔로워 <UnderLine>{followData?.followersCount}</UnderLine>
            </UserInfoLink>{" "}
            <UserInfoLink to={`${PATH.bookshelf}?user=${nickname}`}>
              {isCurrentUser ? "내 책장" : `${userData?.nickname}의 책장`}{" "}
              <UnderLine>{bookcount}</UnderLine>
            </UserInfoLink>
            <UserInfoLink to={`${PATH.userPost}?user=${nickname}`}>
              작성글 <UnderLine>{postDatas?.length}</UnderLine>
            </UserInfoLink>
          </FollowTextWrapper>
        </InfoSection>
      </TopSection>
      <BottomSection></BottomSection>
    </UserInfo>
  );
}

const FollowTextWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;
const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
  padding-top: 120px;
  background: linear-gradient(#10b981 51%, #ffffff 49%);
  width: 100%;
  height: 360px;
`;

const BottomSection = styled.div`
  display: flex;
  flex-direction: column;
`;
const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 16px;
  width: 100%;
`;
const NickName = styled.strong`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #111827;
  white-space: nowrap;
`;
const Biography = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 16px;
`;
const UserInfoLink = styled(Link)`
  text-decoration: none;
  color: #6b7280;
  font-size: 12px;
  width: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  white-space: nowrap;

  svg {
    margin-right: 4px;
  }
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.color.default_green};
  }
`;
const UnderLine = styled.span`
  text-decoration: underline;
  margin-top: 12px;
  font-size: 14px;
  font-weight: bold;
  color: #111827;
`;
const UserInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  white-space: nowrap;
`;

export default ProfileAndInfo;
