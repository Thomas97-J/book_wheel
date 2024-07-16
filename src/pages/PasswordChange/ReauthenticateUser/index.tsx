import { useForm } from "react-hook-form";
import styled from "styled-components";
import useReauthenticate from "../../../hooks/auth/useReauthenticate";
import Warn from "../../../components/common/Warn";

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
    formState: { errors },
  } = useForm<PasswordFrom>({ mode: "onBlur" });
  const mutation = useReauthenticate();

  async function onReauthenticate(data: PasswordFrom) {
    try {
      await mutation.mutateAsync(data);
      reauthDone(true);
    } catch (error) {
      setError(
        "password",
        { message: "비밀번호를 확인하세요." },
        { shouldFocus: true }
      );
      reauthDone(false);
    }
  }

  return (
    <ReauthenticateUserWrapper onSubmit={handleSubmit(onReauthenticate)}>
      <input
        {...register("password", {
          required: true,
        })}
        placeholder="비밀번호를 입력해주세요"
        type="password"
      />
      <Warn>{errors?.password?.message}</Warn>
      <SubmitBtn>확인</SubmitBtn>
    </ReauthenticateUserWrapper>
  );
}

const ReauthenticateUserWrapper = styled.form`
  /* Add your styles here */
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
export default ReauthenticateUser;
