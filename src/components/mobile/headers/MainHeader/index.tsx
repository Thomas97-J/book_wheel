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
      <LeftSide>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 11C9 11.7956 9.31607 12.5587 9.87868 13.1213C10.4413 13.6839 11.2044 14 12 14C12.7956 14 13.5587 13.6839 14.1213 13.1213C14.6839 12.5587 15 11.7956 15 11C15 10.2044 14.6839 9.44129 14.1213 8.87868C13.5587 8.31607 12.7956 8 12 8C11.2044 8 10.4413 8.31607 9.87868 8.87868C9.31607 9.44129 9 10.2044 9 11Z"
            stroke="#111827"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M17.657 16.657L13.414 20.9C13.039 21.2746 12.5306 21.4851 12.0005 21.4851C11.4704 21.4851 10.962 21.2746 10.587 20.9L6.343 16.657C5.22422 15.5382 4.46234 14.1127 4.15369 12.5609C3.84504 11.009 4.00349 9.40053 4.609 7.93874C5.21452 6.47696 6.2399 5.22755 7.55548 4.34852C8.87107 3.46949 10.4178 3.00031 12 3.00031C13.5822 3.00031 15.1289 3.46949 16.4445 4.34852C17.7601 5.22755 18.7855 6.47696 19.391 7.93874C19.9965 9.40053 20.155 11.009 19.8463 12.5609C19.5377 14.1127 18.7758 15.5382 17.657 16.657Z"
            stroke="#111827"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <DropDownSelect
          options={dropDownOptions}
          onSelect={handleSelect}
          placeholder={"서울시 성북구"}
        />
      </LeftSide>
      <SearchLink to={PATH.explore}>
        <svg
          width="33"
          height="32"
          viewBox="0 0 33 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="0.5" width="32" height="32" rx="16" fill="#E5E7EB" />
          <g clipPath="url(#clip0_39_247)">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M15.5 9.33334C14.5964 9.33342 13.7059 9.54959 12.9028 9.96381C12.0998 10.378 11.4074 10.9783 10.8835 11.7145C10.3596 12.4507 10.0193 13.3016 9.89112 14.196C9.76292 15.0905 9.85049 16.0027 10.1465 16.8564C10.4425 17.7101 10.9384 18.4807 11.5928 19.1038C12.2472 19.7269 13.0411 20.1845 13.9083 20.4384C14.7755 20.6923 15.6909 20.7351 16.578 20.5633C17.4651 20.3915 18.2983 20.01 19.008 19.4507L21.4427 21.8853C21.5684 22.0068 21.7368 22.074 21.9116 22.0725C22.0864 22.0709 22.2536 22.0008 22.3772 21.8772C22.5008 21.7536 22.5709 21.5864 22.5724 21.4116C22.574 21.2368 22.5068 21.0684 22.3853 20.9427L19.9507 18.508C20.6093 17.6724 21.0194 16.6683 21.1341 15.6105C21.2487 14.5527 21.0632 13.484 20.5988 12.5267C20.1344 11.5695 19.4099 10.7622 18.5082 10.1975C17.6065 9.63275 16.564 9.33327 15.5 9.33334ZM11.1667 15C11.1667 13.8507 11.6232 12.7485 12.4359 11.9359C13.2485 11.1232 14.3507 10.6667 15.5 10.6667C16.6493 10.6667 17.7515 11.1232 18.5641 11.9359C19.3768 12.7485 19.8333 13.8507 19.8333 15C19.8333 16.1493 19.3768 17.2515 18.5641 18.0641C17.7515 18.8768 16.6493 19.3333 15.5 19.3333C14.3507 19.3333 13.2485 18.8768 12.4359 18.0641C11.6232 17.2515 11.1667 16.1493 11.1667 15Z"
              fill="#111827"
            />
          </g>
          <defs>
            <clipPath id="clip0_39_247">
              <rect
                width="16"
                height="16"
                fill="white"
                transform="translate(8.5 8)"
              />
            </clipPath>
          </defs>
        </svg>
      </SearchLink>
      {/* <svg
        width="33"
        height="32"
        viewBox="0 0 33 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="0.5" width="32" height="32" rx="16" fill="#E5E7EB" />
        <path
          d="M16.5 9.36457V6.99957M16.5 9.36457C17.8849 9.41827 19.1947 10.0083 20.1526 11.01C21.1104 12.0117 21.6413 13.3466 21.633 14.7326V16.5326C21.633 18.9186 23.5 19.5146 23.5 20.7076C23.5 21.3006 23.5 21.9996 22.962 21.9996H10.038C9.5 21.9996 9.5 21.3006 9.5 20.7076C9.5 19.5146 11.367 18.9186 11.367 16.5326V14.7326C11.3587 13.3466 11.8896 12.0117 12.8474 11.01C13.8053 10.0083 15.1151 9.41827 16.5 9.36457ZM13.233 21.9996C13.327 22.8516 13.539 23.5396 14.177 24.1116C14.8154 24.6839 15.6426 25.0004 16.5 25.0004C17.3574 25.0004 18.1846 24.6839 18.823 24.1116C19.461 23.5396 20.059 22.8516 20.153 21.9996H13.233Z"
          stroke="#111827"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg> */}
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
  padding: 0 8px;
  ${(props) => (props.$scrolled ? "box-shadow: none" : "")};
  z-index: 1001;
`;

const LeftSide = styled.div`
  display: flex;
  align-items: center;
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
