import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";

interface SignupForm {
  nickname: string;
  email: string;
  password: string;
  password_conform: string;
  tel: string;
}

function Signup() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<SignupForm>({ mode: "onBlur" });
  const navigate = useNavigate();
  useEffect(() => {
    console.log("error", errors);
  }, [errors]);

  async function singUp(data: SignupForm) {
    try {
      if (data.password !== data.password_conform) {
        setError(
          "password_conform",
          { message: "비밀번호가 일치하지 않습니다." },
          { shouldFocus: true }
        );
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );
        const user = userCredential.user;
        await updateProfile(user, {
          displayName: data.nickname,
        });
        await addDoc(collection(db, "users"), {
          tel: data.tel,
          nickname: data.nickname,
        });
        navigate(-1);
      }
    } catch (error) {
      console.error("Error signing up:", error);
      alert("Error signing up");
    }
  }
  return (
    <SignupWrapper>
      <form onSubmit={handleSubmit(singUp)}>
        <label>이메일</label>
        <input
          {...register("email", {
            required: true,
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-.]+$/,
              message: "이메일 형식이 유효하지 않습니다.",
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
          placeholder="비밀번호를 입력해주세요"
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
          placeholder="비밀번호를 한번 더 입력해주세요"
          type="password"
        />
        <Warn>{errors?.password?.message}</Warn>
        <Warn>{errors?.password_conform?.message}</Warn>
        <label>닉네임</label>
        <input
          {...register("nickname", { required: true })}
          placeholder="닉네임을 입력해주세요"
          type="nickname"
        />
        <label>전화번호</label>
        <input
          {...register("tel", { required: true })}
          placeholder="전화번호를 입력해주세요"
          type="tel"
        />
        <button type="submit" disabled={!isValid}>
          회원가입
        </button>
      </form>
    </SignupWrapper>
  );
}

const SignupWrapper = styled.div`
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

export default Signup;
