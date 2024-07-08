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
      <button
        type="button"
        onClick={() => {
          navigate(-1);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="rgba(0, 0, 0, 1)"
        >
          <path d="M13.939 4.939 6.879 12l7.06 7.061 2.122-2.122L11.121 12l4.94-4.939z"></path>
        </svg>
      </button>
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
    border: none;
  }
`;

export default PostHeader;
