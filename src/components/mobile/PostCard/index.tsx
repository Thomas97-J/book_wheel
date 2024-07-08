import { Link } from "react-router-dom";
import styled from "styled-components";
import { PATH } from "../../../App";
import LikeBtn from "../LikeBtn";
import { useAuth } from "../../../context/AuthContext";
import { Timestamp } from "firebase/firestore";
import formatRelativeTime from "../../../utils/formatRelativeTime";
import useGetCommentCount from "../../../hooks/comments/useGetCommentCount";
import imgPaths from "../../../assets/images/image_path";

function PostCard({ title, content, createdAt, index, id }: Post) {
  const { currentUser } = useAuth();
  const formattedDate = formatRelativeTime(createdAt as Timestamp);
  const { commentCount } = useGetCommentCount(id ?? "");
  return (
    <PostCardWrapper>
      <GoToDetail to={`${PATH.postDetail}?no=${index}`}>
        <Title>
          {title}{" "}
          <Count>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="#666"
            >
              <path d="M12 2C6.486 2 2 5.589 2 10c0 2.908 1.898 5.515 5 6.934V22l5.34-4.005C17.697 17.852 22 14.32 22 10c0-4.411-4.486-8-10-8zm0 14h-.333L9 18v-2.417l-.641-.247C5.67 14.301 4 12.256 4 10c0-3.309 3.589-6 8-6s8 2.691 8 6-3.589 6-8 6z"></path>
              <path d="M8 9h8v2H8z"></path>
            </svg>
            {commentCount}
          </Count>
        </Title>
        <Content>{content}</Content>
        <Date>{formattedDate}</Date>
      </GoToDetail>
      <BtnWrapper>
        <LikeBtn userId={currentUser?.uid ?? ""} postId={id ?? ""} />
      </BtnWrapper>
    </PostCardWrapper>
  );
}
const GoToDetail = styled(Link)`
  text-decoration: none;
  color: black;
`;
const PostCardWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #ccc;
  padding: 10px;
  margin: 0 10px;
  transition: all 0.3s ease;
`;

const Title = styled.h2`
  margin: 0 0 8px 0;
  font-size: 16px;
`;
const Count = styled.span`
  font-size: 14px;
  font-weight: normal;
  color: #666;
  svg {
    margin-right: 4px;
  }
`;

const Content = styled.div`
  font-size: 12px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-bottom: 4px;
`;

const Date = styled.div`
  font-size: 0.8rem;
  color: #666;
`;
const BtnWrapper = styled.div`
  position: absolute;
  right: 10px;
  z-index: 10;
`;
export default PostCard;
