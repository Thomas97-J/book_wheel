import styled from "styled-components";
import { Link } from "react-router-dom";
import { PATH } from "../../../App";
import useGetUserById from "../../../hooks/users/useGetUserById";
import useGetUserPostsByNickname from "../../../hooks/posts/useGetUserPostsByNickname";
import useGetBooksCountByUid from "../../../hooks/books/useGetBooksCountByUid";
import { useAuth } from "../../../context/AuthContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import imgPaths from "../../../assets/images/image_path";

function ProfileSimpleSmall({ uid }: { uid: string }) {
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
          height={60}
          width={60}
        />
        <Skeleton style={{ margin: "4px" }} height={20} width={200} count={2} />
      </UserInfo>
    );
  if (error) return <UserInfo>Error: {error.message}</UserInfo>;

  return (
    <UserInfo>
      <Link to={`${PATH.profile}?user=${userData?.nickname}`}>
        <ProFile
          src={userData?.profileImage ?? imgPaths.defaultProfileImage}
          alt="프로필 이미지"
        />
      </Link>
      <div>
        <NameSection>
          <NickName to={`${PATH.profile}?user=${userData?.nickname}`}>
            {userData?.nickname}
          </NickName>
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
  font-size: 14px;

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
const NickName = styled(Link)`
  text-decoration: none;
  color: #000;
  margin-right: 10px;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const UserInfo = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  margin-bottom: 10px;
`;
const ProFile = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 10px;
`;
export default ProfileSimpleSmall;
