import styled from "styled-components";
import { Link } from "react-router-dom";
import { PATH } from "../../../App";
import useGetUserById from "../../../hooks/users/useGetUserById";
import useGetUserPostsByNickname from "../../../hooks/posts/useGetUserPostsByNickname";
import useGetBooksCountByUid from "../../../hooks/books/useGetBooksCountByUid";
import ProfileImage from "../../common/ProfileImage";
import { useAuth } from "../../../context/AuthContext";

function ProfileSimple({ uid }: { uid: string }) {
  const { userData, isLoading, error } = useGetUserById(uid);
  const { postDatas } = useGetUserPostsByNickname(userData?.nickname);
  const { bookcount } = useGetBooksCountByUid(uid);
  const { currentUser } = useAuth();
  const isCurrentUser = currentUser?.uid === uid;
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

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
    color: #0056b3;
  }
`;

const NameSection = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 4px;
`;
const NickName = styled.span``;

const UserInfo = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 10px;
`;

export default ProfileSimple;
