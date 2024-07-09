import styled from "styled-components";
import useGetUserById from "../../../../hooks/users/useGetUserById";
import ProfileImage from "../../../../components/common/ProfileImage";

function NotMyMessage({ message }: { message: Message }) {
  const uid = message.uid;
  const { userData } = useGetUserById(uid);
  return (
    <NotMyMessageWrapper key={message.id}>
      <ProfileImageWrapper>
        <ProfileImage src={userData?.profileImage} />
      </ProfileImageWrapper>
      <TextSection>
        <Nickname>{message.userName}</Nickname>
        <Content>{message.text}</Content>
      </TextSection>
    </NotMyMessageWrapper>
  );
}
const Nickname = styled.strong`
  white-space: nowrap;
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
const Content = styled.span`
  max-width: 70vw;
`;
const NotMyMessageWrapper = styled.div`
  width: 100%;
  min-height: 30px;

  display: flex;
  margin-bottom: 4px;
`;
export default NotMyMessage;
