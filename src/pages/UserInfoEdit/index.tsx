import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import imageCompression from "browser-image-compression";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { getUserById, updateUserData } from "../../apis/users";
import { uploadFile } from "../../apis/firestore";
import imgPaths from "../../assets/images/image_path";

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
  const queryClient = useQueryClient();
  const [updating, setUpdating] = useState(false);
  const [imgPath, setImgPath] = useState<string | undefined | null>("");
  const imgRef = useRef<HTMLInputElement | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["users", uid],
    queryFn: () => getUserById(uid),
  });
  const uploadMutation = useMutation({
    mutationFn: uploadFile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users", uid] });
    },
  });
  const userInfoUpataeMutation = useMutation({
    mutationFn: updateUserData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users", uid] });
    },
  });

  useEffect(() => {
    if (data?.profileImage) {
      setImgPath(data?.profileImage);
    }
    if (data) {
      setValue("nickname", data.nickname);
      setValue("bio", data.bio);
    }
  }, [data, setValue]);

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
        if (data?.profileImage) {
          console.log(data?.profileImage);
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
const UserInfoEditWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
`;
export default UserInfoEdit;
