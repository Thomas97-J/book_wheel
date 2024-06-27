import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useSignIn from "../../hooks/auth/useSignIn";
import useHandleGoogleLogin from "../../hooks/auth/useHandleGoogleLogin";

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

  const signInMutation = useSignIn({
    onSuccess: () => {
      navigate(-1);
    },
    onError: () => {
      setError(
        "email",
        { message: "이메일 또는 비밀번호를 확인하세요." },
        { shouldFocus: true }
      );
    },
  });

  const googleSignInMutation = useHandleGoogleLogin({
    onSuccess: () => {
      navigate(-1);
    },
    onError: () => {
      setError(
        "email",
        { message: "이메일 또는 비밀번호를 확인하세요." },
        { shouldFocus: true }
      );
    },
  });

  async function onSignIn(data: SigninFormValue) {
    const authData = await signInMutation.mutateAsync(data);
    console.log(authData);
  }

  return (
    <SigninWrapper>
      <div>로고</div>
      <form onSubmit={handleSubmit(onSignIn)}>
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
        <label>비밀번호</label>
        <input
          {...register("password", {
            required: true,
          })}
          placeholder="비밀번호를 입력해주세요"
          type="password"
        />
        <Warn>{errors?.email?.message}</Warn>
        <button type="submit" disabled={!isValid}>
          로그인
        </button>
      </form>
      <Link to={"/signup"}>회원가입</Link>
      <button
        onClick={async () => {
          await googleSignInMutation.mutateAsync();
          navigate(-1);
        }}
      >
        구글 로그인
      </button>
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
