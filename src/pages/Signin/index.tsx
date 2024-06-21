import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

interface SigninFormValue {
  email: string;
  password: string;
}

function Signin() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<SigninFormValue>({ mode: "onBlur" });
  const navigate = useNavigate();

  async function signIn(data: SigninFormValue) {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate(-1);
    } catch (error) {
      setError(
        "email",
        { message: "이메일 또는 비밀번호를 확인하세요." },
        { shouldFocus: true }
      );
    }
  }
  return (
    <SigninWrapper>
      <div>로고</div>
      <form onSubmit={handleSubmit(signIn)}>
        <label>이메일</label>
        <input
          {...register("email", {
            required: true,
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-.]+$/,
              message: "올바른 이메일을 입력하세요.",
            },
          })}
          placeholder="이메일을 입력해주세요"
          type="email"
        />
        <Warn>{errors?.email?.message}</Warn>

        <label>비밀번호</label>
        <input
          {...register("password", {
            required: true,
          })}
          placeholder="비밀번호를 입력해주세요"
          type="password"
        />
        <button type="submit" disabled={!isValid}>
          로그인
        </button>
      </form>
      <Link to={"/signup"}>회원가입</Link>
    </SigninWrapper>
  );
}
``;

const SigninWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  align-items: center;
  justify-content: center;
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    label {
      width: 300px;
      margin-bottom: 5px;
    }
    input {
      width: 300px;
      height: 30px;
      margin-bottom: 10px;
    }
  }
`;
const Warn = styled.p`
  width: 300px;
  color: red;
  font-size: 0.8rem;
  font-weight: 700;
`;

export default Signin;
