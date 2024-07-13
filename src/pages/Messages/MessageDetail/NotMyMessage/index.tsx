import styled from "styled-components";
import useGetUserById from "../../../../hooks/users/useGetUserById";
import ProfileImage from "../../../../components/common/ProfileImage";
import formatRelativeTime from "../../../../utils/formatRelativeTime";

function NotMyMessage({
  message,
  showProfileImage,
}: {
  message: Message;
  showProfileImage: boolean;
}) {
  const formattedDate = formatRelativeTime(message?.createdAt as Timestamp);

  const uid = message.uid;
  const { userData } = useGetUserById(uid);
  return (
    <NotMyMessageWrapper key={message.id}>
      <ProfileImageWrapper>
        {showProfileImage && <ProfileImage src={userData?.profileImage} />}
      </ProfileImageWrapper>
      <TextSection>
        <Content>{message.text}</Content> <Date>{formattedDate}</Date>
      </TextSection>
    </NotMyMessageWrapper>
  );
}

const ProfileImageWrapper = styled.div`
  height: 32px;
  width: 36px;
  img {
    height: 32px;
    width: 32px;
  }
`;
const TextSection = styled.div`
  display: flex;
  align-items: flex-end;
`;

const Content = styled.span`
  background-color: #d3dbcc;
  color: #fff;
  padding: 4px 8px;
  border-radius: 10px;
  max-width: 70vw;
  line-height: 1.4;
`;
const NotMyMessageWrapper = styled.div`
  width: 100%;
  min-height: 30px;

  display: flex;
  align-items: center;
  margin-bottom: 6px;
`;
const Date = styled.div`
  font-size: 0.7rem;
  color: #666;
  margin-left: 6px;
  margin-bottom: 4px;
`;

export default NotMyMessage;
