import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import ReauthenticateUser from "./ReauthenticateUser";
import { useNavigate } from "react-router-dom";
import { passwordUpdate } from "../../apis/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface PasswordChangeFrom {
  new_password: string;
  password_conform: string;
}

function PasswordChange() {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    formState: { errors, isValid },
  } = useForm<PasswordChangeFrom>({ mode: "onBlur" });
  const [isReauthUser, setIsReauthUser] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: passwordUpdate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["password_change"] });
    },
  });
  async function passwordChange(data: PasswordChangeFrom) {
    try {
      if (data.new_password !== data.password_conform) {
        setError(
          "password_conform",
          { message: "비밀번호가 일치하지 않습니다." },
          { shouldFocus: true }
        );
        return;
      }
      await mutation.mutateAsync(data.new_password);
      navigate(-1);
    } catch (error: any) {
      console.log("");
    }
  }

  return (
    <PasswordChangeWrapper>
      {isReauthUser ? (
        <form onSubmit={handleSubmit(passwordChange)}>
          <label>비밀번호</label>
          <input
            {...register("new_password", {
              required: true,
              minLength: {
                value: 8,
                message:
                  "비밀번호는 숫자, 영문 대문자, 소문자, 특수문자를 포함한 8글자 이상이어야 합니다.",
              },
              pattern: {
                value:
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                message:
                  "비밀번호는 숫자, 영문 대문자, 소문자, 특수문자를 포함한 8글자 이상이어야 합니다.",
              },
            })}
            placeholder="새로운 비밀번호를 입력해주세요."
            type="password"
          />
          <label>비밀번호 확인</label>
          <input
            {...register("password_conform", {
              required: true,
              minLength: {
                value: 8,
                message:
                  "비밀번호는 숫자, 영문 대,소문자, 특수문자를 포함한 8글자 이상이어야 합니다.",
              },
            })}
            placeholder="비밀번호를 한번 더 입력해주세요."
            type="password"
          />
          <Warn>{errors?.new_password?.message}</Warn>
          <Warn>{errors?.password_conform?.message}</Warn>
          <button type="submit" disabled={!isValid}>
            {"변경"}
          </button>
        </form>
      ) : (
        <ReauthenticateUser
          reauthDone={(bool: boolean) => {
            setIsReauthUser(bool);
          }}
        />
      )}
    </PasswordChangeWrapper>
  );
}
const Warn = styled.p`
  width: 300px;
  color: red;
  font-size: 0.8rem;
  font-weight: 700;
`;
const PasswordChangeWrapper = styled.div`
  width: 100vw;
  align-items: center;
  justify-content: center;
  form {
    display: flex;
    flex-direction: column;
  }
`;

export default PasswordChange;
