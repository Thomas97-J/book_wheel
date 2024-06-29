import { Link } from "react-router-dom";
import styled from "styled-components";
import { PATH } from "../../../../App";
import dayjs from "dayjs";

function PostCard({ title, content, createdAt, index, id }: Post) {
  console.log(createdAt);
  const formattedDate = dayjs
    .unix(createdAt?.seconds ?? 0)
    .format("YYYY-MM-DD");
  return (
    <PostCardWrapper to={`${PATH.postDetail}?no=${index}`}>
      <Title>{title}</Title>
      <Content>{content}</Content>
      <Date>{formattedDate}</Date>
    </PostCardWrapper>
  );
}

const PostCardWrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  margin: 10px;
  padding: 10px;
  text-decoration: none;
  color: black;
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
export default PostCard;
