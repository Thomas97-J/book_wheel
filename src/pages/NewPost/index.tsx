import React from "react";

import styled from "styled-components";

function NewPost() {
  return (
    <NewPostWrapper>
      <PostForm action="">
        <TopSection>
          <button type="button">취소</button>
          <button type="submit">완료</button>
        </TopSection>
        <label>게시글의 주제를 선택해주세요</label>
        <input type="text" placeholder="제목을 입력하세요." />
        <textarea name="" id=""></textarea>
      </PostForm>
    </NewPostWrapper>
  );
}
const TopSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const PostForm = styled.form`
  display: flex;
  flex-direction: column;
`;
const NewPostWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default NewPost;
