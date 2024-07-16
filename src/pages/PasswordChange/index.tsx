import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import ReauthenticateUser from "./ReauthenticateUser";
import { useNavigate } from "react-router-dom";
import usePasswordUpdate from "../../hooks/auth/usePasswordUpdate";
import PageWrapper from "../../assets/styles/PageWrapper";
import DefaultHeader from "../../components/mobile/headers/DefaultHeader";
import imgPaths from "../../assets/images/image_path";
import Warn from "../../components/common/Warn";

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
  const mutation = usePasswordUpdate();
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
      console.error(error);
    }
  }

  return (
    <PasswordChangeWrapper>
      <DefaultHeader />
      <Logo src={imgPaths.logoWithText} alt="로고" />
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
            })}
            placeholder="비밀번호를 한번 더 입력해주세요."
            type="password"
          />
          <Warn>{errors?.new_password?.message}</Warn>
          <Warn>{errors?.password_conform?.message}</Warn>
          <SubmitBtn type="submit" disabled={!isValid}>
            {"변경"}
          </SubmitBtn>
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

const Logo = styled.img`
  width: 100px;
`;
const PasswordChangeWrapper = styled(PageWrapper)`
  align-items: center;
  justify-content: center;
  padding-top: 200px;
  form {
    display: flex;
    flex-direction: column;
    label {
      margin-bottom: 4px;
    }
    input {
      width: 300px;
      height: 40px;
      margin-bottom: 16px;
    }
  }
`;

const SubmitBtn = styled.button`
  background: ${({ theme }) => theme.color.default_green};
  color: #fff;
  height: 40px;
  border: none;
  font-size: 16px;

  &:disabled {
    background: #bcbcbc;
  }
`;
export default PasswordChange;
