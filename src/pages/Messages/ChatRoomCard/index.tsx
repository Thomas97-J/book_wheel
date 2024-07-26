import { Link } from "react-router-dom";
import styled from "styled-components";
import { PATH } from "../../../App";
import formatRelativeTime from "../../../utils/formatRelativeTime";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import RedDot from "../../../components/common/RedDot";
import ProfileImage from "../../../components/common/ProfileImage";

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
        room.unreadCount[currentUser.uid],
        room
      );
      setUnReadCount(room.unreadCount[currentUser.uid]);
    }
    console.log("room", room);
  }, [room]);

  return (
    <ChatRoomCardWrapper to={`${PATH.messageDetail}?chat=${room.id}`}>
      <ProfileImage src={room.otherUsers[0]?.profileImage} />
      <TextWrapper>
        <Info>
          <strong>{room.otherUsers[0].nickname}</strong>님 과의 대화
          <Date>{formattedDate}</Date>
          {unReadCount ? <RedDot>{unReadCount}</RedDot> : ""}
        </Info>
        <Content>{room?.lastMessage?.text}</Content>
      </TextWrapper>
    </ChatRoomCardWrapper>
  );
}

const ChatRoomCardWrapper = styled(Link)`
  position: relative;
  display: flex;
  align-items: center;
  padding: 8px 4px;
  text-decoration: none;
  font-size: 16px;
  color: #000;
  background: #f3f4f6;

  box-shadow: 0px 4px 6px -1px #0000001a;
  border-radius: 5px;
  margin: 4px 0;
  img {
    width: 40px;
    height: 40px;
  }
`;
const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
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
  min-height: 14px;
`;
const Date = styled.span`
  margin-left: 4px;
  font-size: 12px;
  color: #828282;
`;

export default ChatRoomCard;
