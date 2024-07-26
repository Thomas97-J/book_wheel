import styled from "styled-components";
import ProfileAndInfo from "../../components/mobile/ProfileAndInfo";
import MypageHeader from "../../components/mobile/headers/MypageHeader";
import { useAuth } from "../../context/AuthContext";
import PageWrapper from "../../assets/styles/PageWrapper";
import { Link } from "react-router-dom";
import { PATH } from "../../App";
import useGetUserById from "../../hooks/users/useGetUserById";
import { Helmet } from "react-helmet-async";

function My() {
  const { currentUser } = useAuth();
  const uid = currentUser?.uid ?? "";
  const { userData, isLoading, error } = useGetUserById(uid);

  return (
    <MyWrapper>
      <Helmet>
        <title>책바퀴 - 마이페이지</title>
      </Helmet>
      <MypageHeader />
      <ProfileAndInfo uid={uid} nickname={userData?.nickname} />{" "}
      <MypageBody>
        <MyLink to={`${PATH.likedBook}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="#111827"
          >
            <path d="M3 8v11c0 2.201 1.794 3 3 3h15v-2H6.012C5.55 19.988 5 19.806 5 19s.55-.988 1.012-1H21V4c0-1.103-.897-2-2-2H6c-1.206 0-3 .799-3 3v3zm3-4h13v12H5V5c0-.806.55-.988 1-1z"></path>
            <path d="m11.997 14 3.35-3.289a2.129 2.129 0 0 0 0-3.069 2.225 2.225 0 0 0-3.126 0l-.224.218-.224-.219a2.224 2.224 0 0 0-3.125 0 2.129 2.129 0 0 0 0 3.069L11.997 14z"></path>
          </svg>
          관심 도서 보기
        </MyLink>
        <MyLink to={`${PATH.likedPost}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="#111827"
          >
            <path d="M20 22V4c0-1.103-.897-2-2-2H6c-1.103 0-2 .897-2 2v18l8-4.572L20 22zM6 10V4h12v14.553l-6-3.428-6 3.428V10z"></path>
            <path d="M15.409 9.512c.361-.372.585-.888.585-1.456s-.223-1.083-.585-1.456a1.962 1.962 0 0 0-1.412-.603S13.001 5.994 12 7.026c-1.001-1.032-1.997-1.029-1.997-1.029-.552 0-1.051.23-1.412.603-.362.373-.585.887-.585 1.456s.223 1.084.585 1.456L12 13.203l3.409-3.691z"></path>
          </svg>
          관심 글 보기
        </MyLink>
      </MypageBody>
    </MyWrapper>
  );
}
const MyLink = styled(Link)`
  text-decoration: none;
  color: #111827;
  height: 30px;
  font-size: 14px;
  display: flex;
  align-items: center;
  svg {
    margin-right: 4px;
  }
`;
const MypageBody = styled.div`
  padding: 20px 20px 0;
`;
const MyWrapper = styled(PageWrapper)`
  padding: 0;
`;
export default My;
