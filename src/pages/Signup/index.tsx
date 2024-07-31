import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { checkNicknameExists } from "../../apis/auth";
import useSignUp from "../../hooks/auth/useSignUp";
import PageWrapper from "../../assets/styles/PageWrapper";
import imgPaths from "../../assets/images/image_path";
import DefaultHeader from "../../components/mobile/headers/DefaultHeader";
import Warn from "../../components/common/Warn";
import { useCallback } from "react";
import { debounce } from "lodash";

interface SignupForm {
  nickname: string;
  email: string;
  password: string;
  password_conform: string;
  tel?: string;
}

function Signup() {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    formState: { errors, isValid },
  } = useForm<SignupForm>({ mode: "onBlur" });
  const navigate = useNavigate();
  const signUpMutation = useSignUp();
  const nickname = watch("nickname");

  async function onSignup(data: SignupForm) {
    try {
      if (data.password !== data.password_conform) {
        setError(
          "password_conform",
          { message: "비밀번호가 일치하지 않습니다." },
          { shouldFocus: true }
        );
      } else {
        await signUpMutation.mutateAsync(data);
        navigate(-1);
      }
    } catch (error: any) {
      switch (error.code) {
        case "auth/email-already-in-use":
          setError(
            "email",
            { message: "이미 사용 중인 이메일입니다." },
            { shouldFocus: true }
          );
          break;
        default:
          setError("tel", { message: "잠시 후 다시 시도하세요." });
          break;
      }
    }
  }

  const debouncedOnSignup = useCallback(
    debounce((data: SignupForm) => {
      onSignup(data);
    }, 300),
    []
  );

  return (
    <SignupWrapper>
      <DefaultHeader />
      <Logo src={imgPaths.logoWithText} alt="로고" />
      <form onSubmit={handleSubmit(debouncedOnSignup)}>
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
          })}
          placeholder="비밀번호를 한번 더 입력해주세요"
          type="password"
        />
        <Warn>{errors?.password?.message}</Warn>
        <Warn>{errors?.password_conform?.message}</Warn>
        <label>닉네임</label>
        <input
          {...register("nickname", {
            required: true,
            maxLength: {
              value: 8,
              message: "8자 미만의 닉네임을 사용해 주세요.",
            },
            pattern: {
              value: /^[ㄱ-ㅎ가-힣A-Za-z0-9\d]/,
              message: "닉네임은 특수문자를 포함할 수 없습니다.",
            },
          })}
          placeholder="닉네임을 입력해주세요"
          type="nickname"
          onBlur={async () => {
            if (!/^[ㄱ-ㅎ가-힣A-Za-z0-9\d]/.test(nickname)) {
              setError(
                "nickname",
                { message: "닉네임은 특수문자를 포함할 수 없습니다." },
                { shouldFocus: true }
              );
            } else if (nickname.length >= 9) {
              setError(
                "nickname",
                { message: "8자 이하의 닉네임을 사용해 주세요." },
                { shouldFocus: true }
              );
            } else if (await checkNicknameExists(nickname)) {
              setError(
                "nickname",
                { message: "이미 사용 중인 닉네임입니다." },
                { shouldFocus: true }
              );
            } else {
              clearErrors("nickname");
            }
          }}
        />
        <Warn>{errors?.nickname?.message}</Warn>
        {/* <label>전화번호</label> */}
        {/* <input
          {...register("tel", {
            required: true,
            pattern: {
              value: /^\d{2,3}-\d{3,4}-\d{4}$|^\d{10,11}$/,
              message: "전화번호 형식이 유효하지 않습니다.",
            },
          })}
          placeholder="전화번호를 입력해주세요"
          type="tel"
        /> */}
        <Warn>{errors?.tel?.message}</Warn>
        <SignUpBtn type="submit" disabled={!isValid}>
          회원가입
        </SignUpBtn>
      </form>
    </SignupWrapper>
  );
}
const Logo = styled.img`
  width: 160px;
`;
const SignupWrapper = styled(PageWrapper)`
  align-items: center;
  justify-content: center;
  padding-bottom: 200px;
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    label {
      width: 300px;
      margin-bottom: 10px;
    }
    input {
      width: 300px;
      height: 40px;
      margin-bottom: 16px;
    }
  }
`;

const SignUpBtn = styled.button`
  background: ${({ theme }) => theme.color.default_green};
  color: #fff;
  height: 40px;
  border: none;
  border-radius: 4px;

  font-size: 16px;

  &:disabled {
    background: #bcbcbc;
  }
`;

export default Signup;
