import React from "react";
import styled from "styled-components";
import DropDown from "../../../common/DropDown";

function PostHeader() {
  const dropDownOptions = [
    {
      label: "삭제",
      clickFunction: () => {
        console.log("삭제 클릭");
      },
    },
    {
      label: "수정",
      clickFunction: () => {
        console.log("수정 클릭");
      },
    },
  ];

  return (
    <PostHeaderWrapper>
      <DropDown options={dropDownOptions} buttonInner={"드롭다운"} />
    </PostHeaderWrapper>
  );
}
const PostHeaderWrapper = styled.header`
  height: 60px;
  border-bottom: solid 1px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0;
  button {
    width: 100px;
    margin: 10px;
    white-space: nowrap;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default PostHeader;
