import styled from "styled-components";
import useGetUserById from "../../../../hooks/users/useGetUserById";
import formatRelativeTime from "../../../../utils/formatRelativeTime";
import { Link } from "react-router-dom";
import { PATH } from "../../../../App";
import ProfileImageSmall from "../../../../components/common/ProfileImageSmall";

function DealMessage({ message }: { message: Message }) {
  const formattedDate = formatRelativeTime(message?.createdAt as Timestamp);

  const uid = message.uid;
  const { userData } = useGetUserById(uid);
  return (
    <DealMessageWrapper key={message.id}>
      <ProfileImageWrapper>
        {<ProfileImageSmall src={userData?.profileImage} />}
      </ProfileImageWrapper>
      <TextSection>
        <Content to={`${PATH.deal}/${message.dealId}`}>
          <span>{message.text}</span>
          <span>상세 내용 확인</span>
        </Content>
        <Date>{formattedDate}</Date>
      </TextSection>
    </DealMessageWrapper>
  );
}
const DealMessageWrapper = styled.div`
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

const Content = styled(Link)`
  display: flex;
  flex-direction: column;
  background-color: rgb(255 216 163);
  padding: 4px 8px;
  border-radius: 10px;
  max-width: 70vw;
  text-decoration: none;

  span {
    color: #000;
    text-decoration: none;
    line-height: 1.4;
  }
`;

const Date = styled.div`
  font-size: 0.7rem;
  color: #666;
  margin-left: 6px;
  margin-bottom: 4px;
`;

export default DealMessage;
