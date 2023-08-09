import styled from "@emotion/styled";

import InfoInput from "../InfoInput";
import FileInput from "../FileInput";

const Container = styled.div`
  margin-top: 24px;
`;

const SectionTitle = styled.div`
  font-family: "Pretendard";
  font-size: 17px;
  font-weight: 600;
  line-height: 27px;
  letter-spacing: -0.015em;
  text-align: left;
`;

interface props {
  brandName: string;
  title: string;
  thumbnailImageFile: any;
  changeThumbnailImage: (file: any, src: any) => void;
  changeBrandName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  changeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function BasicForm({
  brandName,
  title,
  thumbnailImageFile,
  changeThumbnailImage,
  changeBrandName,
  changeTitle,
}: props) {
  return (
    <Container>
      <SectionTitle>Basics</SectionTitle>
      <InfoInput
        onChangeInput={changeBrandName}
        value={brandName}
        label={"Brand Name"}
        placeholder={"Enter your brand name"}
      />
      <InfoInput
        onChangeInput={changeTitle}
        value={title}
        label={"Campaign name"}
        placeholder={"Enter your campaign name"}
      />
      <FileInput
        value={thumbnailImageFile}
        changeFile={changeThumbnailImage}
        label={"Thumbnail Image"}
        placeholder={"Select image files from your device"}
        description={"Only JPEG files are accepted"}
        accept={"image/*"}
      />
    </Container>
  );
}
