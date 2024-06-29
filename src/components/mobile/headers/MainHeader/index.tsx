import React from "react";

import styled from "styled-components";
import { useAuth } from "../../../../context/AuthContext";
import { PATH } from "../../../../App";
import { useNavigate } from "react-router-dom";
import DropDown from "../../../common/DropDown";
import Header from "../../../../assets/styles/Header";
import { Link } from "react-router-dom";

function Mainheaders() {
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
    <MainheadersWrapper>
      <DropDown options={dropDownOptions} buttonInner={"지역 선택"} />
      <SearchLink to={PATH.explore}>검색</SearchLink>
    </MainheadersWrapper>
  );
}
const MainheadersWrapper = styled(Header)`
  justify-content: space-between;
`;

const SearchLink = styled(Link)`
  text-decoration: none;
  color: black;
  border: 1px solid;
  border-radius: 12%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;
export default Mainheaders;
