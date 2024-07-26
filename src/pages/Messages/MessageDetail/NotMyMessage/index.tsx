import styled from "styled-components";
import useGetUserById from "../../../../hooks/users/useGetUserById";
import formatRelativeTime from "../../../../utils/formatRelativeTime";
import ProfileImageSmall from "../../../../components/common/ProfileImageSmall";

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
        {showProfileImage && <ProfileImageSmall src={userData?.profileImage} />}
      </ProfileImageWrapper>
      <TextSection>
        <Content>{message.text}</Content> <Date>{formattedDate}</Date>
      </TextSection>
    </NotMyMessageWrapper>
  );
}
const NotMyMessageWrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 30px;
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;
const ProfileImageWrapper = styled.div`
  position: absolute;
  top: 0;
  width: 36px;
  img {
    height: 32px;
    width: 32px;
  }
`;
const TextSection = styled.div`
  display: flex;
  align-items: flex-end;
  margin-left: 36px;
`;
const Content = styled.span`
  background-color: #f0f3ee;
  color: #000;
  padding: 4px 8px;
  border-radius: 10px;
  max-width: 70vw;
  line-height: 1.4;
`;

const Date = styled.div`
  font-size: 0.7rem;
  color: #666;
  margin-left: 6px;
  margin-bottom: 4px;
`;

export default NotMyMessage;
