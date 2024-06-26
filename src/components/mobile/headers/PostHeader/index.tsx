import React from "react";
import styled from "styled-components";
import DropDown from "../../../common/DropDown";
import { useMutation } from "@tanstack/react-query";
import { deletePost } from "../../../../apis/posts";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../../../App";

function PostHeader({ user, postData, postId }) {
  const deleteMutation = useMutation({ mutationFn: deletePost });
  const navigate = useNavigate();
  const dropDownOptions = [
    {
      label: "삭제",
      clickFunction: async () => {
        console.log("삭제 클릭");
        await deleteMutation.mutateAsync(postId);
        navigate(-1);
      },
    },
    {
      label: "수정",
      clickFunction: () => {
        console.log("수정 클릭", postData, postId);
        navigate(`${PATH.postEdit}?id=${postId}`);
      },
    },
  ];

  return (
    <PostHeaderWrapper>
      {user.uid === postData.uid ? (
        <DropDown options={dropDownOptions} buttonInner={"드롭다운"} />
      ) : (
        ""
      )}
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
