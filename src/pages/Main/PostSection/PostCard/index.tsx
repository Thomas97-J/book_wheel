import { Link } from "react-router-dom";
import styled from "styled-components";
import { PATH } from "../../../../App";
import dayjs from "dayjs";
import LikeBtn from "../../../../components/mobile/LikeBtn";
import { useAuth } from "../../../../context/AuthContext";

function PostCard({ title, content, createdAt, index, id }: Post) {
  const { currentUser } = useAuth();
  const formattedDate = dayjs
    .unix(createdAt?.seconds ?? 0)
    .format("YYYY-MM-DD");
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
  border: 1px solid #ccc;
  margin: 10px;
  padding: 10px;

  transition: all 0.3s ease;
`;

const Title = styled.h2`
  margin: 0 0 8px 0;
  font-size: 20px;
`;

const Content = styled.div`
  font-size: 14px;
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
