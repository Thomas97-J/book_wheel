import styled from "styled-components";
import DropDown from "../../../common/DropDown";
import { PATH } from "../../../../App";
import { useNavigate } from "react-router-dom";
import Header from "../../../../assets/styles/Header";
import { useAuth } from "../../../../context/AuthContext";

function MypageHeader() {
  const navigate = useNavigate();
  const { currentUser, isLoading, logout } = useAuth();

  const dropDownOptions = [
    {
      label: "프로필 수정",
      clickFunction: async () => {
        navigate(`${PATH.infoFix}`);
      },
    },
    {
      label: "비밀번호 변경",
      clickFunction: () => {
        navigate(`${PATH.passwordChange}`);
      },
    },
    {
      label: "로그아웃",
      clickFunction: async () => {
        await logout();
      },
    },
  ];
  return (
    <MypageHeaderWrapper>
      <DropDown
        options={dropDownOptions}
        buttonInner={"드롭다운"}
        isRightSide={true}
      />
    </MypageHeaderWrapper>
  );
}
const MypageHeaderWrapper = styled(Header)`
  justify-content: flex-end;
`;
export default MypageHeader;
