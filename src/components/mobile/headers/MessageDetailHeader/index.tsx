import styled from "styled-components";
import Header from "../../../../assets/styles/Header";
import { useNavigate } from "react-router-dom";
import useGetUserById from "../../../../hooks/users/useGetUserById";
import React from "react";
import DropDown from "../../../common/DropDown";
import ThreeDot from "../../../common/ThreeDotIcon";

function MessageDetailHeader({ receiverUserId }: { receiverUserId: string }) {
  const { userData } = useGetUserById(receiverUserId);
  const navigate = useNavigate();
  const dropDownOptions = [
    {
      label: "거래 신청하기",
      clickFunction: async () => {},
    },
  ];
  return (
    <MessageHeaderWrapper>
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
      <Nickname>{userData?.nickname}</Nickname>

      {/* <DropDown
        options={dropDownOptions}
        buttonInner={<ThreeDot />}
        isRightSide={true}
      /> */}
    </MessageHeaderWrapper>
  );
}
const MessageHeaderWrapper = styled(Header)`
  justify-content: flex-start;
  button {
    border: none;
  }
`;
const Nickname = styled.div`
  width: 100%;
`;
const MemoizedMessageHeader = React.memo(MessageDetailHeader);

export default MemoizedMessageHeader;
