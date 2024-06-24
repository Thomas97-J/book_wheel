import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

interface PasswordFrom {
  password: string;
}
function ReauthenticateUser({ currentUser, reauthDone }) {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    formState: { errors, isValid },
  } = useForm<PasswordFrom>({ mode: "onBlur" });

  useEffect(() => {
    // console.log(credential);
  }, []);
  async function reauthenticate(data: PasswordFrom) {
    try {
      const credential = EmailAuthProvider.credential(
        currentUser.email,
        data.password
      );

      await reauthenticateWithCredential(currentUser, credential)
        .then(() => {
          reauthDone(true);
        })
        .catch((error) => {
          setError(
            "password",
            { message: "비밀번호를 확인하세요." },
            { shouldFocus: true }
          );
          reauthDone(false);
        });
    } catch {
      console.log("");
    }
  }

  return (
    <ReauthenticateUserWrapper onSubmit={handleSubmit(reauthenticate)}>
      <input
        {...register("password", {
          required: true,
        })}
        placeholder="비밀번호를 입력해주세요"
        type="password"
      />
      <Warn>{errors?.password?.message}</Warn>

      <button>확인</button>
    </ReauthenticateUserWrapper>
  );
}
const Warn = styled.p`
  width: 300px;
  color: red;
  font-size: 0.8rem;
  font-weight: 700;
`;
const ReauthenticateUserWrapper = styled.form`
  /* Add your styles here */
`;
export default ReauthenticateUser;
