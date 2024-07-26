import styled from "styled-components";
import imgPaths from "../../../assets/images/image_path";

function ProfileImage({ src }: { src: string | null | undefined }) {
  return (
    <ProFile src={src ?? imgPaths.defaultProfileImage} alt="프로필 이미지" />
  );
}

const ProFile = styled.img`
  min-width: 120px;
  width: 120px;
  min-height: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid #f9fafb;

  box-shadow: 0px 10px 15px -3px #0000001a;
  background-color: #fff;
`;
export default ProfileImage;
