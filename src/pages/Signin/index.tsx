import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useSignIn from "../../hooks/auth/useSignIn";
import useHandleGoogleLogin from "../../hooks/auth/useHandleGoogleLogin";
import PageWrapper from "../../assets/styles/PageWrapper";
import imgPaths from "../../assets/images/image_path";
import DefaultHeader from "../../components/mobile/headers/DefaultHeader";
import Warn from "../../components/common/Warn";

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
      <DefaultHeader />
      <Logo src={imgPaths.logoWithText} alt="로고" />
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
        <SigninBtn type="submit" disabled={!isValid}>
          로그인
        </SigninBtn>
      </form>
      <SignupBtnWrapper>
        <GoToSignup to={"/signup"}>회원가입</GoToSignup>
        <GoogleSigninBtn
          onClick={async () => {
            await googleSignInMutation.mutateAsync();
            // navigate(-1);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="rgba(26, 79, 4, 1)"
          >
            <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
          </svg>
          구글 로그인
        </GoogleSigninBtn>
      </SignupBtnWrapper>
    </SigninWrapper>
  );
}
``;

const SigninWrapper = styled(PageWrapper)`
  padding-top: 200px;
  align-items: center;
  justify-content: center;
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
const Logo = styled.img`
  width: 100px;
`;
const GoToSignup = styled(Link)`
  display: flex;
  justify-content: center;
  color: ${({ theme }) => theme.color.default_green};
  text-decoration: none;
  width: 128px;
  font-size: 16px;
`;
const SigninBtn = styled.button`
  background: ${({ theme }) => theme.color.default_green};
  color: #fff;
  border: none;
  border-radius: 4px;
  height: 32px;
  font-size: 16px;
`;

const GoogleSigninBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.color.default_green};
  border-radius: 4px;
  color: ${({ theme }) => theme.color.default_green};
  height: 40px;
  white-space: nowrap;
  width: 128px;
  font-size: 16px;

  svg {
    margin-right: 4px;
  }
`;
const SignupBtnWrapper = styled.span`
  display: flex;
  align-items: center;
  margin-top: 12px;
`;

export default Signin;
