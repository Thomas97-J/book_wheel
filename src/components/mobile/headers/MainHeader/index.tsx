import React from "react";

import styled from "styled-components";
import { useAuth } from "../../../../context/AuthContext";
import { PATH } from "../../../../App";
import { useNavigate } from "react-router-dom";
import DropDown from "../../../common/DropDown";
import Header from "../../../../assets/styles/Header";
import { Link } from "react-router-dom";

function Mainheaders({ needBottomLine }: { needBottomLine: boolean }) {
  const navigate = useNavigate();
  const dropDownOptions = [
    {
      label: "지역1",
      clickFunction: () => {
        console.log("지역1 클릭");
      },
    },
    {
      label: "지역2",
      clickFunction: () => {
        console.log("지역2 클릭");
      },
    },
  ];
  return (
    <MainheadersWrapper $scrolled={!needBottomLine}>
      <DropDownBtnWrapper>
        <DropDown options={dropDownOptions} buttonInner={"지역 선택"} />
      </DropDownBtnWrapper>
      <SearchLink to={PATH.explore}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="rgba(0, 0, 0, 1)"
        >
          <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path>
        </svg>
      </SearchLink>
    </MainheadersWrapper>
  );
}
const MainheadersWrapper = styled(Header)<{ $scrolled: boolean }>`
  justify-content: space-between;
  padding: 0 8px;
  ${(props) => (props.$scrolled ? "box-shadow: none" : "")};
`;
const DropDownBtnWrapper = styled.div`
  border: 1px solid;
  border-radius: 10px;
`;
const SearchLink = styled(Link)`
  text-decoration: none;
  color: black;
  border-radius: 12%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export default Mainheaders;
