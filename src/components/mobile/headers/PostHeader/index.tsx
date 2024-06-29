import styled from "styled-components";
import DropDown from "../../../common/DropDown";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../../../App";
import useDeletePost from "../../../../hooks/posts/useDeletePost";
import Header from "../../../../assets/styles/Header";

function PostHeader({ user, postData }) {
  const deleteMutation = useDeletePost();
  const navigate = useNavigate();
  const dropDownOptions = [
    {
      label: "삭제",
      clickFunction: async () => {
        console.log("삭제 클릭");
        await deleteMutation.mutateAsync(postData.id);
        navigate(-1);
      },
    },
    {
      label: "수정",
      clickFunction: () => {
        console.log("수정 클릭", postData);
        navigate(`${PATH.postEdit}?no=${postData.index}`);
      },
    },
  ];

  return (
    <PostHeaderWrapper>
      {user?.uid === postData.uid ? (
        <DropDown options={dropDownOptions} buttonInner={"드롭다운"} />
      ) : (
        ""
      )}
    </PostHeaderWrapper>
  );
}
const PostHeaderWrapper = styled(Header)`
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
