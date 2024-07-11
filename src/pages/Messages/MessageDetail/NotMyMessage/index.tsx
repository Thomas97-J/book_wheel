import styled from "styled-components";
import useGetUserById from "../../../../hooks/users/useGetUserById";
import ProfileImage from "../../../../components/common/ProfileImage";
import formatRelativeTime from "../../../../utils/formatRelativeTime";

function NotMyMessage({ message }: { message: Message }) {
  const formattedDate = formatRelativeTime(message?.createdAt as Timestamp);

  const uid = message.uid;
  const { userData } = useGetUserById(uid);
  return (
    <NotMyMessageWrapper key={message.id}>
      <ProfileImageWrapper>
        <ProfileImage src={userData?.profileImage} />
      </ProfileImageWrapper>
      <TextSection>
        <TopWrapper>
          <Nickname>{message.userName}</Nickname>
          <Date>{formattedDate}</Date>
        </TopWrapper>
        <Content>{message.text}</Content>
      </TextSection>
    </NotMyMessageWrapper>
  );
}
const Nickname = styled.strong`
  white-space: nowrap;
  font-weight: bold;
`;
const ProfileImageWrapper = styled.div`
  img {
    height: 40px;
    width: 40px;
  }
`;
const TextSection = styled.div`
  display: flex;
  flex-direction: column;
`;
const TopWrapper = styled.span`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
`;
const Content = styled.span`
  max-width: 70vw;
`;
const NotMyMessageWrapper = styled.div`
  width: 100%;
  min-height: 30px;

  display: flex;
  align-items: center;
  margin-bottom: 6px;
`;
const Date = styled.div`
  font-size: 0.8rem;
  color: #666;
  margin-left: 10px;
`;

export default NotMyMessage;
