import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { PATH } from "../../../../App";

const PostCardWrapper = styled(Link)`
  border: 1px solid;
  margin: 2px;
`;

function PostCard({ title, content, uid, createdAt, id }: Post) {
  return (
    <PostCardWrapper to={`${PATH.postDetail}?id=${id}`}>
      <h2>{title}</h2>
      <div>{content}</div>
    </PostCardWrapper>
  );
}

export default PostCard;
