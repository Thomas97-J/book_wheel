import styled from "styled-components";

const FileUploadWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const FileUploadInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  display: none;
`;

const FileUploadButton = styled.label`
  display: inline-block;
  /* background: ${({ theme }) => theme.color.default_green}; */
  /* color: white; */
  /* padding: 10px 20px; */
  /* font-size: 16px; */
  /* border: none; */
  /* border-radius: 4px; */
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

function FileUpload({
  onFileChange,
  children,
}: {
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  children: any;
}) {
  return (
    <FileUploadWrapper>
      <FileUploadButton htmlFor="imageInput">{children}</FileUploadButton>
      <FileUploadInput
        id="imageInput"
        type="file"
        onChange={onFileChange}
        accept="image/*"
      />
    </FileUploadWrapper>
  );
}

export default FileUpload;
