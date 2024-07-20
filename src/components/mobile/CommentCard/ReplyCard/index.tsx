import styled from "styled-components";
import { Link } from "react-router-dom";
import { PATH } from "../../../../App";

import useGetUserById from "../../../../hooks/users/useGetUserById";
import useDeleteReplyFromComment from "../../../../hooks/comments/useDeleteReplyFromComment";
import { useAuth } from "../../../../context/AuthContext";
import DateString from "../../../common/DateString";

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

  const deleteMutation = useDeleteReplyFromComment(commentId, postId);
  return (
    <ReplyCardWrapper>
      <InfoSection>
        <ProfileLink to={`${PATH.profile}?user=${userData?.nickname}`}>
          {userData?.nickname}
        </ProfileLink>
        <DateString date={createdAt} />
      </InfoSection>
      <Content>{content}</Content>
      {isCommentOwner && (
        <DeleteBtn
          onClick={async () => {
            if (isCommentOwner) {
              await deleteMutation.mutateAsync(id);
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
    </ReplyCardWrapper>
  );
}
const ProfileLink = styled(Link)`
  text-decoration: none;
  color: #414141;
  margin-right: 6px;
`;
const DeleteBtn = styled.button`
  position: absolute;
  right: 10px;
  top: 12px;
  padding: 0;
  border: none;
`;
const Content = styled.span`
  font-size: 14px;
  /* white-space: ; */
  word-break: break-all;
`;
const ReplyCardWrapper = styled.div`
  border-top: 1px solid #ccc;
  margin-top: 8px;
  padding: 8px 20px 8px 24px;
  position: relative;
`;
const InfoSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
`;

export default ReplyCard;
