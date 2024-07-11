import { Link } from "react-router-dom";
import styled from "styled-components";
import { PATH } from "../../../App";
import useGetCommentCount from "../../../hooks/comments/useGetCommentCount";
import DateString from "../../common/DateString";

function PostCard({ title, content, createdAt, index, id, postImage }: Post) {
  const { commentCount } = useGetCommentCount(id ?? "");
  return (
    <PostCardWrapper>
      <GoToDetail to={`${PATH.postDetail}?no=${index}`}>
        <TitleAndInfo>
          <Title>{title}</Title>
          {postImage && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="#rgb(26, 79, 4)"
            >
              <path d="M19 3H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM5 19V5h14l.002 14H5z"></path>
              <path d="m10 14-1-1-3 4h12l-5-7z"></path>
            </svg>
          )}
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
        </TitleAndInfo>
        <Content>{content}</Content>
        <DateString date={createdAt} />
      </GoToDetail>
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
const TitleAndInfo = styled.span`
  display: flex;
  align-items: center;
  margin: 0 0 8px 0;
`;
const Title = styled.h2`
  display: inline-block;
  align-items: center;
  font-size: 16px;
  margin-right: 4px;
  max-width: 90%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const Count = styled.span`
  font-size: 14px;
  font-weight: normal;
  color: #666;
  display: flex;
  align-items: center;
  position: absolute;
  right: 0;
  width: 40px;
  white-space: nowrap;
  text-align: center;
  svg {
    margin-top: 2px;
    margin-right: 4px;
    height: 18px;
    width: 18px;
  }
`;

const Content = styled.div`
  font-size: 12px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-bottom: 8px;
`;

const Date = styled.div`
  font-size: 0.8rem;
  color: #666;
`;

export default PostCard;
