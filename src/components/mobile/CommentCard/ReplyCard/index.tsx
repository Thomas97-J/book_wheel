import styled from "styled-components";
import { Link } from "react-router-dom";
import { PATH } from "../../../../App";

import useGetUserById from "../../../../hooks/users/useGetUserById";
import useDeleteReplyFromComment from "../../../../hooks/comments/useDeleteReplyFromComment";
import { useAuth } from "../../../../context/AuthContext";
import DateString from "../../../common/DateString";
import imgPaths from "../../../../assets/images/image_path";
import { useState } from "react";

function ReplyCard({
  id,
  content,
  createdAt,
  userId,
  postId,
  commentId,
}: {
  id: string;
  content: string;
  createdAt: Timestamp;
  userId: string;
  postId: string;
  commentId: string;
}) {
  const { userData } = useGetUserById(userId);
  const { currentUser } = useAuth();
  const isCommentOwner = userId === currentUser?.uid;
  const [isRemoved, setIsRemoved] = useState(false);

  const deleteMutation = useDeleteReplyFromComment(commentId, postId);

  if (isRemoved) {
    return "";
  }
  return (
    <ReplyCardWrapper>
      <Profile
        src={userData?.profileImage ?? imgPaths.defaultProfileImage}
        alt="프로필 이미지"
      />
      <Wrapper>
        <InfoSection>
          <ProfileLink to={`${PATH.profile}?user=${userData?.nickname}`}>
            {userData?.nickname}
          </ProfileLink>
          <DateString date={createdAt} />
        </InfoSection>
        <Content>{content}</Content>
        {isCommentOwner && (
          <DeleteBtn
            onClick={async (e) => {
              if (isCommentOwner) {
                e.stopPropagation();
                await deleteMutation.mutateAsync(id);
                setIsRemoved(true);
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="rgba(0, 0, 0, 0.3)"
            >
              <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm4.207 12.793-1.414 1.414L12 13.414l-2.793 2.793-1.414-1.414L10.586 12 7.793 9.207l1.414-1.414L12 10.586l2.793-2.793 1.414 1.414L13.414 12l2.793 2.793z"></path>
            </svg>{" "}
          </DeleteBtn>
        )}
      </Wrapper>
    </ReplyCardWrapper>
  );
}
const Profile = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 10px;
`;
const Wrapper = styled.div`
  width: 100%;
`;
const ProfileLink = styled(Link)`
  text-decoration: none;
  color: #414141;
  margin-right: 6px;
  font-weight: bold;
  font-size: 14px;
`;
const DeleteBtn = styled.button`
  position: absolute;
  right: 0;
  top: 6px;
  padding: 0;
  border: none;
`;
const Content = styled.span`
  border: none;
  word-break: break-all;
  display: flex;
  align-items: center;
  padding: 8px;
  font-size: 14px;
  background-color: #e5e7eb;
  width: 100%;
  min-height: 32px;
  border-radius: 10px;
  text-align: left;
`;
const ReplyCardWrapper = styled.div`
  margin-top: 4px;
  position: relative;
  position: relative;
  display: flex;
  padding: 8px 0 0;
  width: 100%;
`;
const InfoSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
`;

export default ReplyCard;
