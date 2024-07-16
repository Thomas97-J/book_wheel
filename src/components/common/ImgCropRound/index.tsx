import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import styled from "styled-components";
import { getOrientation } from "get-orientation/browser";
import { getCroppedImg, getRotatedImage } from "../../../utils/getCroppedImg";
import FileUpload from "../FileUpload";

const ORIENTATION_TO_ANGLE: { [key: string]: number } = {
  "3": 180,
  "6": 90,
  "8": -90,
};

function ImgCropRound({
  saveCroppedImage,
  children,
}: {
  saveCroppedImage: (blob: Blob | null, url: string | null) => void;
  children: any;
}) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [rotation, setRotation] = useState<number>(0);
  const [zoom, setZoom] = useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const onCropComplete = useCallback(
    (_croppedArea: any, croppedAreaPixels: any) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const showCroppedImage = useCallback(async () => {
    try {
      if (imageSrc && croppedAreaPixels) {
        const { blob, url } = await getCroppedImg(
          imageSrc,
          croppedAreaPixels,
          rotation
        );
        saveCroppedImage(blob, url);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setImageSrc(null);
    }
  }, [imageSrc, croppedAreaPixels, rotation]);

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl = await readFile(file);

      try {
        // apply rotation if needed
        const orientation = await getOrientation(file);
        const rotation = ORIENTATION_TO_ANGLE[String(orientation)];
        if (rotation) {
          imageDataUrl = await getRotatedImage(imageDataUrl, rotation);
        }
      } catch (e) {
        console.warn("failed to detect the orientation");
      }

      setImageSrc(imageDataUrl);
    }
  };

  return (
    <Container>
      {imageSrc ? (
        <ImgCropWrapper>
          <CropContainer>
            <Cropper
              image={imageSrc}
              crop={crop}
              rotation={rotation}
              zoom={zoom}
              aspect={1}
              cropShape={"round"}
              onCropChange={setCrop}
              onRotationChange={setRotation}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </CropContainer>
          <Controls>
            <SliderContainer>
              <Label>회전</Label>
              <Slider
                type="range"
                min={0}
                max={360}
                step={1}
                value={rotation}
                onChange={(e) => setRotation(Number(e.target.value))}
              />
            </SliderContainer>
            <Button onClick={showCroppedImage}>저장</Button>
          </Controls>
        </ImgCropWrapper>
      ) : (
        <FileUpload onFileChange={onFileChange}>{children}</FileUpload>
      )}
    </Container>
  );
}

const readFile = (file: File) => {
  return new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      () => resolve(reader.result as string),
      false
    );
    reader.readAsDataURL(file);
  });
};
const ImgCropWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: #fff;
  z-index: 1001;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
`;

const CropContainer = styled.div`
  position: relative;
  width: 100%;
  height: 60%;
  background: #333;
  @media (min-width: 600px) {
    height: 400px;
  }
`;

const Controls = styled.div`
  padding: 4px 16px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  @media (min-width: 600px) {
    flex-direction: row;
    align-items: center;
  }
`;

const SliderContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  margin-bottom: 8px;
  @media (min-width: 600px) {
    margin-bottom: 0;
    margin-right: 16px;
  }
`;

const Label = styled.span`
  min-width: 65px;
`;

const Slider = styled.input`
  flex: 1;
  padding: 16px 0;
  margin-left: 16px;
  accent-color: ${({ theme }) => theme.color.default_green};
`;

const Button = styled.button`
  padding: 8px 16px;
  background: ${({ theme }) => theme.color.default_green};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export default ImgCropRound;
