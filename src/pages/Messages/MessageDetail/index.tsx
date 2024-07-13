import { useEffect, useRef, useState } from "react";
import useAddMessage from "../../../hooks/message/useAddMessage";
import useFetchMessages from "../../../hooks/message/useFetchMessages";
import DefaultHeader from "../../../components/mobile/headers/DefaultHeader";
import styled from "styled-components";
import PageWrapper from "../../../assets/styles/PageWrapper";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import MyMessage from "./MyMessage";
import NotMyMessage from "./NotMyMessage";
import { useForm } from "react-hook-form";
import useGetChatUsers from "../../../hooks/message/useGetChatUsers";
import useResetUnreadCount from "../../../hooks/message/useResetUnreadCount";
import MessageHeader from "../../../components/mobile/headers/MessageHeader";

interface MessageValue {
  message: string;
}

function MessageDetail() {
  const [query, setQuery] = useSearchParams();
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    setFocus,
    formState: { errors, isValid },
  } = useForm<MessageValue>({
    mode: "onBlur",
  });
  const { currentUser } = useAuth();
  const chatId = query.get("chat") ?? "";
  const { data: messages, isLoading, isError } = useFetchMessages(chatId);
  const { users } = useGetChatUsers(chatId);
  const receiverUserId =
    users?.find((userId) => userId !== currentUser?.uid) ?? "";
  const addMessageMutation = useAddMessage(chatId, receiverUserId);
  const resetCountMutaion = useResetUnreadCount(chatId, currentUser?.uid ?? "");
  const bottomRef = useRef<HTMLDivElement | null>(null);

  async function handleSendMessage(data: MessageValue) {
    if (data.message.trim() === "") return;
    try {
      await addMessageMutation.mutateAsync({
        text: data.message,
        chatId: chatId,
        uid: currentUser?.uid ?? "",
        userName: currentUser?.displayName ?? "",
      });
      setValue("message", "");
    } catch (error) {
      console.error("Error adding message:", error);
    }
  }

  async function resetUnReadCount() {
    await resetCountMutaion.mutateAsync();
  }

  useEffect(() => {
    if (bottomRef?.current) {
      bottomRef?.current.scrollIntoView();
    }
    console.log("users", users);
  }, [messages]);

  useEffect(() => {
    if (currentUser?.uid) {
      resetUnReadCount();
    }

    return () => {
      resetUnReadCount();
    };
  }, [currentUser?.uid]);

  if (isError) {
    return <div>Error loading messages.</div>;
  }

  return (
    <MessageDetailWrapper>
      <MessageHeader receiverUserId={receiverUserId} />
      <div>최상단</div>
      <div>
        {messages?.map((message, index) => {
          const showProfileImage =
            index === 0 || messages[index - 1].uid !== message.uid;

          if (message.uid === currentUser?.uid)
            return <MyMessage key={message.id} message={message} />;
          else {
            return (
              <NotMyMessage
                key={message.id}
                message={message}
                showProfileImage={showProfileImage}
              />
            );
          }
        })}
      </div>
      <div ref={bottomRef}></div>
      <MessageForm onSubmit={handleSubmit(handleSendMessage)}>
        <input {...register("message")} type="text" enterKeyHint="send" />
        {/* <button type="submit">전송</button> */}
      </MessageForm>
    </MessageDetailWrapper>
  );
}

const MessageDetailWrapper = styled(PageWrapper)`
  /* Add your styles here */
`;
const MessageForm = styled.form`
  display: flex;
  position: fixed;
  z-index: 1001;
  left: 0;
  bottom: 0;
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
    border: solid 1px #888;
    border-radius: 10px;
    margin-left: 10px;
  }
`;
export default MessageDetail;
