import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { db, storage } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useAuth } from "../../components/AuthContext";

interface FixUserInfoFormValue {
  nickname: string;
  bio: string;
  photoFile?: any;
}

interface FileObject extends Blob {
  name: string;
  lastModified: number;
  lastModifiedDate: Date;
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
  const { register, handleSubmit } = useForm<FixUserInfoFormValue>();
  const { currentUser } = useAuth();
  const uid = currentUser?.uid ?? "";
  const queryClient = useQueryClient();
  const [updating, setUpdating] = useState(false);
  const [imgPath, setImgPath] = useState<string | undefined | null>("");
  const imgRef = useRef<HTMLInputElement | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["user", uid],
    queryFn: () => fetchUserData(uid),
  });
  const uploadMutation = useMutation({
    mutationFn: uploadFile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", uid] });
    },
  });
  const userInfoUpataeMutation = useMutation({
    mutationFn: updateUserData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", uid] });
    },
  });

  async function sendFixInfo(data: FixUserInfoFormValue) {
    setUpdating(true);
    try {
      if (data?.photoFile) {
        const selectedFile: FileObject = data.photoFile[0];
        const downloadURL = await uploadMutation.mutateAsync({
          uid,
          name: selectedFile.name,
          file: selectedFile,
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
    }
  }

  useEffect(() => {
    console.log(imgPath);
  }, [imgPath]);
  return (
    <UserInfoEditWrapper>
      <img src={imgPath ? imgPath : ``} alt="이미지 업로드" />{" "}
      <div>더미 이미지</div>
      <FixUserForm onSubmit={handleSubmit(sendFixInfo)}>
        <input
          {...register("photoFile", { required: true })}
          type="file"
          accept="image/*"
          onChange={saveImgFile}
          ref={imgRef}
        />
        <input
          {...register("nickname", { required: true })}
          type="text"
          defaultValue={data?.nickname}
        />
        <input
          {...register("bio", { required: true })}
          type="text"
          defaultValue={data?.bio}
        />
        <button type="submit">{updating ? "저장중" : "저장"}</button>
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
