import styled from "styled-components";
import ProfileAndInfo from "../../components/mobile/ProfileAndInfo";
import MypageHeader from "../../components/mobile/headers/MypageHeader";
import { useAuth } from "../../context/AuthContext";
import PageWrapper from "../../assets/styles/PageWrapper";
import { Link } from "react-router-dom";
import { PATH } from "../../App";
import useGetUserById from "../../hooks/users/useGetUserById";

function My() {
  const { currentUser } = useAuth();
  const uid = currentUser?.uid ?? "";
  const { userData, isLoading, error } = useGetUserById(uid);

  return (
    <MyWrapper>
      <MypageHeader />
      <ProfileAndInfo uid={uid} nickname={userData?.nickname} />{" "}
      <Link to={`${PATH.likedBook}`}>관심 도서</Link>
      <Link to={`${PATH.likedPost}`}>관심 글</Link>
    </MyWrapper>
  );
}

const MyWrapper = styled(PageWrapper)``;
export default My;
