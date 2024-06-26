import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { PATH } from "../../../../App";

const PostCardWrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  border: 1px solid;
  margin: 2px;
  text-decoration: none;
  color: black;
`;

function PostCard({ title, content, uid, createdAt, index, id }: Post) {
  return (
    <PostCardWrapper to={`${PATH.postDetail}?no=${index}`}>
      <h2>{title}</h2>
      <div>{content}</div>
    </PostCardWrapper>
  );
}

export default PostCard;
