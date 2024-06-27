import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { checkNicknameExists } from "../../apis/auth";
import useSignUp from "../../hooks/auth/useSignUp";

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
  return (
    <SignupWrapper>
      <form onSubmit={handleSubmit(onSignup)}>
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
          onBlur={async () => {
            if (await checkNicknameExists(nickname)) {
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
        <label>전화번호</label>
        <input
          {...register("tel", {
            required: true,
            pattern: {
              value: /^\d{2,3}-\d{3,4}-\d{4}$|^\d{10,11}$/,
              message: "전화번호 형식이 유효하지 않습니다.",
            },
          })}
          placeholder="전화번호를 입력해주세요"
          type="tel"
        />
        <Warn>{errors?.tel?.message}</Warn>
        <SignUpBtn type="submit" disabled={!isValid}>
          회원가입
        </SignUpBtn>
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

const SignUpBtn = styled.button`
  &:disabled {
    border: 1px solid #bcbcbc;
    color: #bcbcbc;
  }
`;

const Warn = styled.p`
  width: 300px;
  color: red;
  font-size: 0.8rem;
  font-weight: 700;
`;

export default Signup;
