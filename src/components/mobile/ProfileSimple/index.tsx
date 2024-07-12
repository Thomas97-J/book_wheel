import styled from "styled-components";
import { Link } from "react-router-dom";
import { PATH } from "../../../App";
import useGetUserById from "../../../hooks/users/useGetUserById";
import useGetUserPostsByNickname from "../../../hooks/posts/useGetUserPostsByNickname";
import useGetBooksCountByUid from "../../../hooks/books/useGetBooksCountByUid";
import ProfileImage from "../../common/ProfileImage";
import { useAuth } from "../../../context/AuthContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function ProfileSimple({ uid }: { uid: string }) {
  const { userData, isLoading, error } = useGetUserById(uid);
  const { postDatas } = useGetUserPostsByNickname(userData?.nickname);
  const { bookcount } = useGetBooksCountByUid(uid);
  const { currentUser } = useAuth();
  const isCurrentUser = currentUser?.uid === uid;
  if (isLoading)
    return (
      <UserInfo>
        <Skeleton
          style={{ marginBottom: "2px", marginRight: "10px" }}
          circle={true}
          height={100}
          width={100}
        />
        <Skeleton style={{ margin: "4px" }} height={30} width={200} count={2} />
      </UserInfo>
    );
  if (error) return <UserInfo>Error: {error.message}</UserInfo>;

  return (
    <UserInfo>
      <ProfileImage src={userData?.profileImage} />
      <div>
        <NameSection>
          <NickName>{userData?.nickname}</NickName>
        </NameSection>
        <div>
          <UserInfoLink to={`${PATH.bookshelf}?user=${userData?.nickname}`}>
            {isCurrentUser ? "내 책장" : `${userData?.nickname}의 책장`}{" "}
            {bookcount}
          </UserInfoLink>
          <UserInfoLink to={`${PATH.userPost}?user=${userData?.nickname}`}>
            작성글 {postDatas?.length}
          </UserInfoLink>
        </div>
      </div>
    </UserInfo>
  );
}

const UserInfoLink = styled(Link)`
  text-decoration: none;
  color: #000;
  padding: 4px;
  height: 30px;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.color.default_green};
  }
`;

const NameSection = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 4px;
`;
const NickName = styled.strong`
  margin-right: 10px;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const UserInfo = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  margin-bottom: 10px;
`;

export default ProfileSimple;
