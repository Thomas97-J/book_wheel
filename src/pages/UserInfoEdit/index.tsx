import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import imageCompression from "browser-image-compression";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import imgPaths from "../../assets/images/image_path";
import useGetUserById from "../../hooks/users/useGetUserById";
import useUpdateUserData from "../../hooks/users/useUpdateUserData";
import useUploadFile from "../../hooks/firestore/useUploadFile";
import PageWrapper from "../../assets/styles/PageWrapper";

interface FixUserInfoFormValue {
  nickname: string;
  bio: string;
  photoFile?: any;
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

  const uploadMutation = useUploadFile(uid);
  const userInfoUpataeMutation = useUpdateUserData(uid);

  useEffect(() => {
    if (userData?.profileImage) {
      setImgPath(userData?.profileImage);
    }
    if (userData) {
      setValue("nickname", userData.nickname);
      setValue("bio", userData.bio);
    }
  }, [userData, setValue]);

  async function uplodeImgFile(imgFile: FileObject) {
    const options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 256,
      useWebWorker: true,
      fileType: "image/jpeg",
    };
    const compressedFile = await imageCompression(imgFile, options); //이미지 파일 압축

    const downloadURL = await uploadMutation.mutateAsync({
      file: compressedFile,
      path: `${uid}/profile/profileImg`,
    });
    console.log("이미지네임", compressedFile.name);

    return downloadURL;
  }

  async function sendFixInfo(profileData: FixUserInfoFormValue) {
    setUpdating(true);

    try {
      if (profileData?.photoFile) {
        if (userData?.profileImage) {
          console.log(userData?.profileImage);
        }
        const downloadURL = await uplodeImgFile(profileData.photoFile);
        console.log(downloadURL);
        const dataWithProfile = {
          ...profileData,
          profileImage: downloadURL,
        };
        await userInfoUpataeMutation.mutateAsync({
          uid,
          data: dataWithProfile,
        });
      } else {
        await userInfoUpataeMutation.mutateAsync({ uid, data: profileData });
      }
    } catch (error: any) {
      console.log(error);
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
