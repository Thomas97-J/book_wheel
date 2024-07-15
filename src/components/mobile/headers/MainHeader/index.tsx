import styled from "styled-components";
import { PATH } from "../../../../App";
import Header from "../../../../assets/styles/Header";
import { Link } from "react-router-dom";
import DropDownSelect from "../../../common/DropDownSelect";
import { useState } from "react";
import DefualtPopup from "../../../common/DefaultPopup";

function Mainheaders({ needBottomLine }: { needBottomLine: boolean }) {
  const [isPopupOn, setIsPopupOn] = useState(false);
  const dropDownOptions = [
    {
      label: "서울시 성북구",
      value: 1,
    },
    {
      label: "지역 추가",
      value: false,
    },
  ];
  const handleSelect = (option: { label: string; value: any }) => {
    console.log(option.label);
    if (option.value === false) {
      console.log("추가 클릭");
      setIsPopupOn(true);
    }
  };
  return (
    <MainheadersWrapper $scrolled={!needBottomLine}>
      <DropDownSelect
        options={dropDownOptions}
        onSelect={handleSelect}
        placeholder={"서울시 성북구"}
      />
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
      {isPopupOn && (
        <DefualtPopup
          setIsPopupOn={setIsPopupOn}
          title={"업데이트 예정"}
          content="현재 책바퀴의 서비스는 서울시 성북구에서만 제공됩니다."
        />
      )}
    </MainheadersWrapper>
  );
}
const MainheadersWrapper = styled(Header)<{ $scrolled: boolean }>`
  justify-content: space-between;
  padding: 0 8px;
  ${(props) => (props.$scrolled ? "box-shadow: none" : "")};
  z-index: 1001;
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
