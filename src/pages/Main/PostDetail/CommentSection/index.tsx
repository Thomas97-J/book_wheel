import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useAuth } from "../../../../context/AuthContext";
import useCreateComment from "../../../../hooks/comments/useCreateComment";
import useInfiniteComments from "../../../../hooks/comments/useInfiniteComments";
import CommentCard from "../../../../components/mobile/CommentCard";
import { useCallback, useEffect, useState } from "react";
import ReplyModal from "./ReplyModal";
import useAddReplyToComment from "../../../../hooks/comments/useAddReplyToComment";
import LoadingSpinner from "../../../../components/mobile/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../../../App";
import { debounce, throttle } from "lodash";
interface CommentValue {
  content: string;
  "": string;
}
interface ReplyTarget {
  comment: any;
  userData: any;
}
function CommentSection({ postId }: { postId: string }) {
  const { register, handleSubmit, setError, setFocus, setValue } =
    useForm<CommentValue>({
      mode: "onBlur",
    });
  const { currentUser } = useAuth();
  const createMutation = useCreateComment(postId);
  const {
    ref,
    commentData,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteComments(postId);
  const [replyPopupOpen, setReplyPopupOpen] = useState(false);
  const [replyTarget, setReplyTarget] = useState<ReplyTarget>({
    comment: null,
    userData: null,
  });
  const replyMutation = useAddReplyToComment(postId);
  const navigate = useNavigate();

  const isEmptyComment = commentData?.pages[0].comments.length === 0;
  useEffect(() => {
    console.log("commentData", commentData);
  }, []);

  async function onCommentSubmit(commentData: CommentValue) {
    if (currentUser?.uid) {
      if (replyPopupOpen) {
        await replyMutation.mutateAsync({
          commentId: replyTarget?.comment.id,
          replyData: { content: commentData.content, userId: currentUser.uid },
        });
        setReplyPopupOpen(false);
        setReplyTarget({ comment: null, userData: null });
        setValue("content", "");
      } else {
        console.log("commentData", commentData);

        await createMutation.mutateAsync({
          postId: postId,
          uid: currentUser?.uid,
          content: commentData.content,
        });
        setValue("content", "");
      }
    } else {
      alert("로그인 후 댓글을 달아주세요.");
      navigate(PATH.signIn);
    }
  }

  const throttledOnCommentSubmit = useCallback(
    throttle((commentData: CommentValue) => {
      onCommentSubmit(commentData);
    }, 1000),
    [replyPopupOpen]
  );

  function handleReplyPopupOpen(bool: boolean, content?: any) {
    setReplyPopupOpen(bool);
    setReplyTarget(content);
    if (bool) {
      setFocus("content");
    } else {
      setFocus("");
    }
  }

  return (
    <CommentSectionWrapper>
      {isLoading && <LoadingSpinner />}
      {isEmptyComment ? (
        <EmptyComment>첫 댓글을 달아주세요.</EmptyComment>
      ) : (
        commentData?.pages.map((page, pageIndex) => (
          <div key={pageIndex}>
            {page.comments.map((comment) => (
              <CommentCard
                key={comment.id}
                comment={comment}
                handleReplyPopupOpen={handleReplyPopupOpen}
              />
            ))}
          </div>
        ))
      )}
      <div ref={ref}></div>
      {replyPopupOpen && (
        <ReplyModal
          replyTarget={replyTarget}
          handleReplyPopupOpen={handleReplyPopupOpen}
        />
      )}
      <CommentForm onSubmit={handleSubmit(throttledOnCommentSubmit)}>
        <InputShape>
          <input
            {...register("content", { required: true })}
            type="text"
            autoComplete="off"
            placeholder={
              replyPopupOpen ? "답글을 입력해주세요." : "댓글을 입력해주세요."
            }
          />
          <button>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_128_703)">
                <path
                  d="M16.8625 4.73833C17.2225 3.74249 16.2575 2.77749 15.2617 3.13833L3.09083 7.53999C2.09166 7.90166 1.97083 9.26499 2.88999 9.79749L6.77499 12.0467L10.2442 8.57749C10.4013 8.4257 10.6118 8.3417 10.8303 8.3436C11.0488 8.3455 11.2578 8.43314 11.4123 8.58765C11.5668 8.74215 11.6545 8.95116 11.6564 9.16966C11.6583 9.38816 11.5743 9.59866 11.4225 9.75583L7.95333 13.225L10.2033 17.11C10.735 18.0292 12.0983 17.9075 12.46 16.9092L16.8625 4.73833Z"
                  fill="#9CA3AF"
                />
              </g>
              <defs>
                <clipPath id="clip0_128_703">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
        </InputShape>
      </CommentForm>
    </CommentSectionWrapper>
  );
}
const EmptyComment = styled.div`
  padding: 10px 20px 30px;
  font-size: 14px;
  font-weight: bold;
`;

const CommentSectionWrapper = styled.div`
  padding-bottom: 180px;
`;
const CommentForm = styled.form`
  display: flex;
  position: fixed;
  z-index: 1000;
  bottom: 38px;
  width: 100vw;
  max-width: 600px;
  height: 108px;
  padding: 8px 20px 0;
  background-color: #fff;
  box-shadow: 0px -2px 3px 0px rgba(0, 0, 0, 0.2);
  input {
    background: none;
    border: none;
    width: 100%;
    font-size: 16px;
  }
  button {
    white-space: nowrap;
    border: none;
    margin-left: 8px;
    padding: 2px 10px;
  }
`;

const InputShape = styled.div`
  display: flex;
  width: 100%;
  height: 40px;
  border-radius: 30px;
  padding: 0 8px;
  background-color: #f3f4f6;
`;
export default CommentSection;
