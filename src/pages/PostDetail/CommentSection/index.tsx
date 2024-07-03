import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useAuth } from "../../../context/AuthContext";
import useCreateComment from "../../../hooks/comments/useCreateComment";
import useInfiniteComments from "../../../hooks/comments/useInfiniteComments";
import CommentCard from "../../../components/mobile/CommentCard";
import { useDeleteComment } from "../../../hooks/comments/useDeleteComment";
interface CommentValue {
  content: string;
}
function CommentSection({ postId }: { postId: string }) {
  const { register, handleSubmit, setError, setValue } = useForm<CommentValue>({
    mode: "onBlur",
  });
  const { currentUser } = useAuth();
  const createMutation = useCreateComment(postId);
  const {
    ref,
    commentData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteComments(postId);

  async function onCommentSubmit(commentData: CommentValue) {
    if (currentUser?.uid) {
      console.log("commentData", commentData);

      await createMutation.mutateAsync({
        postId: postId,
        uid: currentUser?.uid,
        content: commentData.content,
      });
      setValue("content", "");
    }
  }
  return (
    <CommentSectionWrapper>
      댓글 섹션{" "}
      {commentData?.pages.map((page, pageIndex) => (
        <div key={pageIndex}>
          {page.comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
        </div>
      ))}
      <div ref={ref}></div>
      <CommentForm onSubmit={handleSubmit(onCommentSubmit)}>
        <input
          {...register("content", { required: true })}
          type="text"
          placeholder="댓글을 입력해주세요."
        />
        <button>저장</button>
      </CommentForm>
    </CommentSectionWrapper>
  );
}
const CommentSectionWrapper = styled.div`
  padding-bottom: 50px;
  /* Add your styles here */
`;
const CommentForm = styled.form`
  display: flex;
  position: fixed;
  z-index: 1001;
  left: 0;
  bottom: 50px;
  width: 100vw;
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
  }
`;
export default CommentSection;
