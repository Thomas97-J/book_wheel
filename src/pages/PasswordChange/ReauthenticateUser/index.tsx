import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useAuth } from "../../../context/AuthContext";

interface PasswordFrom {
  password: string;
}
function ReauthenticateUser({
  reauthDone,
}: {
  reauthDone: (bool: boolean) => void;
}) {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    formState: { errors, isValid },
  } = useForm<PasswordFrom>({ mode: "onBlur" });
  const { currentUser } = useAuth();

  useEffect(() => {
    // console.log(credential);
  }, []);
  async function reauthenticate(data: PasswordFrom) {
    try {
      if (!currentUser?.email) return false;
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
