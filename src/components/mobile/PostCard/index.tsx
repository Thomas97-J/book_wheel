import { Link } from "react-router-dom";
import styled from "styled-components";
import { PATH } from "../../../App";
import LikeBtn from "../LikeBtn";
import { useAuth } from "../../../context/AuthContext";
import { Timestamp } from "firebase/firestore";
import formatRelativeTime from "../../../utils/formatRelativeTime";

function PostCard({ title, content, createdAt, index, id }: Post) {
  const { currentUser } = useAuth();
  const formattedDate = formatRelativeTime(createdAt as Timestamp);

  return (
    <PostCardWrapper>
      <GoToDetail to={`${PATH.postDetail}?no=${index}`}>
        <Title>{title}</Title>
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
