import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useAuth } from "../../../context/AuthContext";
import useCreateComment from "../../../hooks/comments/useCreateComment";
import useInfiniteComments from "../../../hooks/comments/useInfiniteComments";
import CommentCard from "../../../components/mobile/CommentCard";
import { useEffect, useState } from "react";
import ReplyModal from "./ReplyModal";
import useAddReplyToComment from "../../../hooks/comments/useAddReplyToComment";
import LoadingSpinner from "../../../components/mobile/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../../App";
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
        console.log("replyData", commentData);

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
      <CommentWrapper>
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
      </CommentWrapper>
      {replyPopupOpen && (
        <ReplyModal
          replyTarget={replyTarget}
          handleReplyPopupOpen={handleReplyPopupOpen}
        />
      )}
      <CommentForm onSubmit={handleSubmit(onCommentSubmit)}>
        <input
          {...register("content", { required: true })}
          type="text"
          placeholder={
            replyPopupOpen ? "답글을 입력해주세요." : "댓글을 입력해주세요."
          }
        />
        <button>등록</button>
      </CommentForm>
    </CommentSectionWrapper>
  );
}
const EmptyComment = styled.div`
  padding-top: 10px;
`;
const CommentWrapper = styled.div`
  padding: 0 10px;
`;
const CommentSectionWrapper = styled.div`
  padding-bottom: 50px;
  border-top: 1px solid #ccc;
`;
const CommentForm = styled.form`
  display: flex;
  position: fixed;
  z-index: 1001;
  bottom: 49px;
  width: 100vw;
  max-width: 600px;
  height: 50px;
  padding: 4px 10px;
  background-color: #fff;
  box-shadow: 0px -2px 3px 0px rgba(0, 0, 0, 0.2);
  input {
    width: 100%;
    height: 40px;
    border-radius: 30px;
  }
  button {
    white-space: nowrap;
    border: solid 1px #888;
    border-radius: 10px;
    margin-left: 8px;
    padding: 2px 10px;
    border: 1px solid ${({ theme }) => theme.color.default_green};
    color: ${({ theme }) => theme.color.default_green};
    font-weight: bold;
  }
`;
export default CommentSection;
