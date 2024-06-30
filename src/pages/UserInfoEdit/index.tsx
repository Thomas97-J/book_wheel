import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import imgPaths from "../../assets/images/image_path";
import useGetUserById from "../../hooks/users/useGetUserById";
import useUpdateUserData from "../../hooks/users/useUpdateUserData";
import PageWrapper from "../../assets/styles/PageWrapper";
import { useUploadImgFile } from "../../hooks/firestore/useUploadImgFile";

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
    formState: { errors, isValid },
  } = useForm<FixUserInfoFormValue>({
    mode: "onBlur",
  });
  const { currentUser } = useAuth();
  const uid = currentUser?.uid ?? "";
  const [updating, setUpdating] = useState(false);
  const [imgPath, setImgPath] = useState<string | undefined | null>("");
  const imgRef = useRef<HTMLInputElement | null>(null);
  const { userData, isLoading, error } = useGetUserById(uid);
  const { uploadImgFile, isUploading } = useUploadImgFile({
    maxSizeMB: 0.2,
    maxWidthOrHeight: 256,
  });
  const userInfoUpataeMutation = useUpdateUserData(uid);

  useEffect(() => {
    if (userData?.profileImage) {
      setImgPath(userData?.profileImage);
      setValue("profileImage", userData.profileImage);
    }
    if (userData) {
      setValue("nickname", userData.nickname);
      setValue("bio", userData.bio);
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
          `/users/${uid}/profile/profileImg`
        );
        updatedProfileData.profileImage = downloadURL;
      } else if (profileData?.profileImage) {
        updatedProfileData.profileImage = profileData?.profileImage;
      }
      await userInfoUpataeMutation.mutateAsync({
        uid,
        data: updatedProfileData,
      });
    } catch (error: any) {
      console.error("Failed to update user info:", error);
    } finally {
      setUpdating(false);
    }
  }

  function saveImgFile() {
    if (
      imgRef.current &&
      imgRef.current.files &&
      imgRef.current.files.length > 0
    ) {
      const file = imgRef?.current.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImgPath(reader.result as string);
      };
      setValue("photoFile", file); // Update react-hook-form value
    }
  }

  return (
    <UserInfoEditWrapper>
      <ProFile
        src={imgPath ? imgPath : imgPaths.defaultProfileImage}
        alt="이미지 업로드"
      />
      <FixUserForm onSubmit={handleSubmit(sendFixInfo)}>
        <input
          type="file"
          accept="image/*"
          {...register("photoFile")}
          onChange={saveImgFile}
          ref={imgRef}
        />
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

const ProFile = styled.img`
  width: 100px;
  height: 100px;
`;
const FixUserForm = styled.form`
  display: flex;
  flex-direction: column;
`;
const UserInfoEditWrapper = styled(PageWrapper)``;
export default UserInfoEdit;
