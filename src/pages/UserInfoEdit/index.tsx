import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import imageCompression from "browser-image-compression";

import { db, storage } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useAuth } from "../../context/AuthContext";

interface FixUserInfoFormValue {
  nickname: string;
  bio: string;
  photoFile?: any;
}

interface FileObject extends Blob {
  name: string;
  lastModified: number;
  // lastModifiedDate: Date;
  webkitRelativePath: string;
  size: number;
  type: string;
}

async function fetchUserData(uid: string) {
  const userDoc = doc(db, "users", uid);
  const userSnapshot = await getDoc(userDoc);
  return userSnapshot.data();
}

async function updateUserData({ uid, data }: { uid: string; data: any }) {
  const userDoc = doc(db, "users", uid);
  await updateDoc(userDoc, {
    nickname: data?.nickname ?? "",
    bio: data?.bio ?? "",
    profileImage: data?.profileImage ?? "",
  });
}

async function uploadFile(data: {
  uid: string;
  name: string;
  file: FileObject;
}) {
  const imageRef = ref(storage, `${data.uid}/${data.name}`);
  await uploadBytes(imageRef, data.file);
  const downloadURL = await getDownloadURL(imageRef);
  return downloadURL;
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
    queryFn: () => fetchUserData(uid),
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
    console.log("isValid", isValid);
  }, [isValid]);
  useEffect(() => {
    if (data?.profileImage) {
      setImgPath(data?.profileImage);
    }
  }, [data]);

  async function sendFixInfo(data: FixUserInfoFormValue) {
    setUpdating(true);

    try {
      if (data?.photoFile) {
        const selectedFile: FileObject = data.photoFile;
        const options = {
          maxSizeMB: 0.2, // 이미지 최대 용량
          maxWidthOrHeight: 256, // 최대 넓이(혹은 높이)
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(selectedFile, options); //이미지 파일 압축

        const downloadURL = await uploadMutation.mutateAsync({
          uid,
          name: compressedFile.name,
          file: compressedFile,
        });
        console.log(downloadURL);
        const dataWithProfile = { ...data, profileImage: downloadURL };
        await userInfoUpataeMutation.mutateAsync({
          uid,
          data: dataWithProfile,
        });
      } else {
        await userInfoUpataeMutation.mutateAsync({ uid, data });
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
        src={imgPath ? imgPath : "/src/assets/images/icons8-user-64.png"}
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
          defaultValue={data?.nickname}
          {...register("nickname", { required: true })}
        />
        <input
          type="text"
          placeholder="인사말을 입력하세요."
          defaultValue={data?.bio}
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
