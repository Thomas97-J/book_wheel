import styled from "styled-components";
import { PATH } from "../../../../../App";
import { Link } from "react-router-dom";
import LikeBtnComment from "../../../../../components/mobile/LikeBtnComment";
import { useAuth } from "../../../../../context/AuthContext";
import ReplyCard from "../../../../../components/mobile/CommentCard/ReplyCard";
import DateString from "../../../../../components/common/DateString";
import CommentCard from "../../../../../components/mobile/CommentCard";

const ReplyModalWrapper = styled.div`
  /* Add your styles here */
`;
interface Comment {
  id: string;
  postId: string;
  uid: string;
  content: string;
  createdAt: Timestamp;
  replies: any; // 리플이 있는 경우 배열로 포함
}

function ReplyModal({
  replyTarget,
  handleReplyPopupOpen,
}: {
  replyTarget: { comment: Comment; userData: UserData };
  handleReplyPopupOpen: (bool: boolean) => void;
}) {
  return (
    <>
      <ModalOverlay
        onClick={() => {
          handleReplyPopupOpen(false);
        }}
      ></ModalOverlay>
      <ModalContent>
        <CommentCard
          comment={replyTarget.comment}
          handleReplyPopupOpen={handleReplyPopupOpen}
          withOutReply={true}
        />
        <ReplyCardWrapper>
          {replyTarget.comment.replies?.map((reply: any) => (
            <ReplyCard
              id={reply?.id}
              key={reply?.id}
              content={reply.content}
              commentId={replyTarget.comment?.id}
              createdAt={reply.createdAt}
              postId={replyTarget.comment.postId}
              userId={reply.userId}
            />
          ))}
        </ReplyCardWrapper>
      </ModalContent>
    </>
  );
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  max-width: 600px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  z-index: 1000;
`;
const ModalContent = styled.div`
  background: white;
  padding: 20px 0;
  padding-bottom: 100px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 100vw;
  min-height: 120px;
  max-width: 600px;
  position: fixed;
  bottom: 120px;
  z-index: 1000;
`;
const ReplyCardWrapper = styled.div`
  padding: 0 20px 0 52px;
`;
const Content = styled.span`
  display: flex;
  font-size: 14px;
  margin-bottom: 4px;
`;
export default ReplyModal;
