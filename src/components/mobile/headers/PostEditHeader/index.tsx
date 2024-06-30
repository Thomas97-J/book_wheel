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
        취소
      </button>
      <button form="postForm" type="submit">
        저장
      </button>
    </PostEditHeaderWrapper>
  );
}
const PostEditHeaderWrapper = styled(Header)`
  /* Add your styles here */
`;

export default PostEditHeader;
