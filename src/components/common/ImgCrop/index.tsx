import React, { useState, useCallback, useEffect } from "react";
import Cropper from "react-easy-crop";
import styled from "styled-components";
import { getOrientation } from "get-orientation/browser";
import { getCroppedImg, getRotatedImage } from "../../../utils/getCroppedImg";

const ORIENTATION_TO_ANGLE: { [key: string]: number } = {
  "3": 180,
  "6": 90,
  "8": -90,
};

function ImgCrop({ saveCroppedImage }) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [rotation, setRotation] = useState<number>(0);
  const [zoom, setZoom] = useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

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
              <Label>Rotation</Label>
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
        <input type="file" onChange={onFileChange} accept="image/*" />
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
  height: 100vh;
  width: 100vw;
  background-color: #fff;
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
  height: 200px;
  background: #333;
  @media (min-width: 600px) {
    height: 400px;
  }
`;

const Controls = styled.div`
  padding: 16px;
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
  padding: 22px 0;
  margin-left: 16px;
`;

const Button = styled.button`
  flex-shrink: 0;
  margin-left: 16px;
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export default ImgCrop;
