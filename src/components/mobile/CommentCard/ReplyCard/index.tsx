import styled from "styled-components";
import { Link } from "react-router-dom";
import { PATH } from "../../../../App";

import useGetUserById from "../../../../hooks/users/useGetUserById";
import formatRelativeTime from "../../../../utils/formatRelativeTime";
import useDeleteReplyFromComment from "../../../../hooks/comments/useDeleteReplyFromComment";
import { useAuth } from "../../../../context/AuthContext";

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

  const formattedDate = formatRelativeTime(createdAt as Timestamp);
  const deleteMutation = useDeleteReplyFromComment(commentId, postId);
  return (
    <ReplyCardWrapper>
      <InfoSection>
        <ProfileLink to={`${PATH.profile}?user=${userData?.nickname}`}>
          {userData?.nickname}
        </ProfileLink>
        <span>{formattedDate}</span>
      </InfoSection>
      {content}{" "}
      {isCommentOwner && (
        <DeleteBtn
          onClick={async () => {
            if (isCommentOwner) {
              console.log("id", id);

              await deleteMutation.mutateAsync(id);
            }
          }}
        >
          삭제
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
`;
const ReplyCardWrapper = styled.div`
  /* Add your styles here */
  padding-left: 20px;
`;
const InfoSection = styled.div``;

export default ReplyCard;
