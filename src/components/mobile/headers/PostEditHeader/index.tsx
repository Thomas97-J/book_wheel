import styled from "styled-components";
import Header from "../../../../assets/styles/Header";
import { useNavigate } from "react-router-dom";

function PostEditHeader() {
  const navigate = useNavigate();

  return (
    <PostEditHeaderWrapper>
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
      <button form="postForm" type="submit">
        저장
      </button>
    </PostEditHeaderWrapper>
  );
}
const PostEditHeaderWrapper = styled(Header)`
  button {
    border: none;
    font-size: 16px;
  }
`;

export default PostEditHeader;
