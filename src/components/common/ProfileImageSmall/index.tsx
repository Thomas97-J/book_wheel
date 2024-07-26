import styled from "styled-components";
import imgPaths from "../../../assets/images/image_path";

function ProfileImageSmall({ src }: { src: string | null | undefined }) {
  return (
    <ProFile src={src ?? imgPaths.defaultProfileImage} alt="프로필 이미지" />
  );
}

const ProFile = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 10px;
`;
export default ProfileImageSmall;
