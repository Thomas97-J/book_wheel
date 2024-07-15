import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import useGetUserById from "../../hooks/users/useGetUserById";
import useUpdateUserData from "../../hooks/users/useUpdateUserData";
import PageWrapper from "../../assets/styles/PageWrapper";
import { useUploadImgFile } from "../../hooks/firestore/useUploadImgFile";
import ImgCropRound from "../../components/common/ImgCropRound";
import ProfileImage from "../../components/common/ProfileImage";
import DefaultHeader from "../../components/mobile/headers/DefaultHeader";

interface FixUserInfoFormValue {
  nickname: string;
  bio: string;
  photoFile?: any;
  profileImage?: string;
}

function UserInfoEdit() {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    trigger,
    formState: { errors, isValid },
  } = useForm<FixUserInfoFormValue>({
    mode: "onBlur",
  });
  const { currentUser } = useAuth();
  const uid = currentUser?.uid ?? "";
  const [updating, setUpdating] = useState(false);
  const { userData, isLoading, error } = useGetUserById(uid);
  const { uploadImgFile, isUploading } = useUploadImgFile({
    maxSizeMB: 0.2,
    maxWidthOrHeight: 256,
  });
  const userInfoUpataeMutation = useUpdateUserData(currentUser);

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  function saveCroppedImage(blob: Blob | null, url: string | null) {
    setImagePreview(url);
    setValue("photoFile", blob);
  }

  useEffect(() => {
    if (userData?.profileImage) {
      setValue("profileImage", userData.profileImage);
      setImagePreview(userData.profileImage);
    }
    if (userData) {
      setValue("nickname", userData.nickname);
      setValue("bio", userData.bio);
      trigger();
    }
  }, [userData, setValue]);

  async function sendFixInfo(profileData: FixUserInfoFormValue) {
    setUpdating(true);
    try {
      const updatedProfileData: FixUserInfoFormValue = {
        nickname: profileData.nickname,
        bio: profileData.bio,
      };
      if (profileData?.photoFile) {
        const downloadURL = await uploadImgFile(
          profileData.photoFile,
          `/users/${currentUser?.uid}/profile/profileImg`
        );
        updatedProfileData.profileImage = downloadURL;
      } else if (profileData?.profileImage) {
        updatedProfileData.profileImage = profileData?.profileImage;
      }
      await userInfoUpataeMutation.mutateAsync({
        currentUser,
        data: updatedProfileData,
      });
    } catch (error: any) {
      console.error("Failed to update user info:", error);
    } finally {
      setUpdating(false);
    }
  }

  return (
    <UserInfoEditWrapper>
      <DefaultHeader />
      <TopSection>
        <ProfileImage src={imagePreview} />
        <CropWrapper>
          <ImgCropRound saveCroppedImage={saveCroppedImage}>
            이미지 수정
          </ImgCropRound>
        </CropWrapper>
      </TopSection>

      <FixUserForm onSubmit={handleSubmit(sendFixInfo)}>
        <input
          type="text"
          placeholder="사용자명을 입력하세요."
          {...register("nickname", {
            required: true,
            maxLength: {
              value: 8,
              message: "8자 미만의 닉네임을 사용해 주세요.",
            },
            pattern: {
              value: /^[가-힣A-Za-z\d]{1,8}$/,
              message: "닉네임은 특수문자를 포함할 수 없습니다.",
            },
          })}
        />
        <input
          type="text"
          placeholder="인사말을 입력하세요."
          {...register("bio", { required: true })}
        />
        <button type="submit" disabled={!isValid}>
          {updating ? "저장중" : "저장"}
        </button>
      </FixUserForm>
    </UserInfoEditWrapper>
  );
}
const TopSection = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
`;

const CropWrapper = styled.div`
  width: 200px;
`;
const FixUserForm = styled.form`
  display: flex;
  flex-direction: column;
  input {
    margin-bottom: 10px;
  }
  button {
    background: ${({ theme }) => theme.color.default_green};
    color: white;
    font-size: 16px;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
  }
`;
const UserInfoEditWrapper = styled(PageWrapper)``;
export default UserInfoEdit;
