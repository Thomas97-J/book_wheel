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
      <ProfileImage src={imagePreview} />
      <ImgCropRound saveCroppedImage={saveCroppedImage}>
        이미지 업로드
      </ImgCropRound>
      <FixUserForm onSubmit={handleSubmit(sendFixInfo)}>
        <input
          type="text"
          placeholder="사용자명을 입력하세요."
          {...register("nickname", { required: true })}
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

const FixUserForm = styled.form`
  display: flex;
  flex-direction: column;
`;
const UserInfoEditWrapper = styled(PageWrapper)``;
export default UserInfoEdit;
