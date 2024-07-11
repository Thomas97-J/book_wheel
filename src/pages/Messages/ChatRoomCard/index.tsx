import { Link } from "react-router-dom";
import styled from "styled-components";
import { PATH } from "../../../App";
import formatRelativeTime from "../../../utils/formatRelativeTime";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import RedDot from "../../../components/common/RedDot";

function ChatRoomCard({ room }: { room: any }) {
  const { currentUser } = useAuth();
  const [unReadCount, setUnReadCount] = useState(0);
  const formattedDate = formatRelativeTime(room.updatedAt as Timestamp);
  useEffect(() => {
    if (
      currentUser?.uid &&
      room?.unreadCount &&
      room.unreadCount[currentUser.uid]
    ) {
      console.log(
        "Unread count for current user:",
        room.unreadCount[currentUser.uid]
      );
      setUnReadCount(room.unreadCount[currentUser.uid]);
    }
  }, [room]);

  return (
    <ChatRoomCardWrapper to={`${PATH.messageDetail}?chat=${room.id}`}>
      <Info>
        <strong>{room.otherUsers[0].nickname}</strong>님 과의 대화
        <Time>{formattedDate}</Time>
        {unReadCount ? <RedDot>{unReadCount}</RedDot> : ""}
      </Info>
      <Content>{room?.lastMessage?.text}</Content>
    </ChatRoomCardWrapper>
  );
}

const ChatRoomCardWrapper = styled(Link)`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 60px;
  padding: 8px;
  text-decoration: none;
  font-size: 16px;
  color: #000;
  border-bottom: solid 1px #ccc;
`;

const Info = styled.span`
  position: relative;
  margin-bottom: 6px;
`;
const Content = styled.span`
  color: #737373;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 14px;
`;
const Time = styled.span`
  margin-left: 4px;
  font-size: 14px;
  color: #828282;
`;

export default ChatRoomCard;
