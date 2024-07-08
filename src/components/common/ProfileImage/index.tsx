import styled from "styled-components";
import imgPaths from "../../../assets/images/image_path";

function ProfileImage({ src }: { src: string | null | undefined }) {
  return (
    <ProFile src={src ?? imgPaths.defaultProfileImage} alt="프로필 이미지" />
  );
}

const ProFile = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;
export default ProfileImage;
