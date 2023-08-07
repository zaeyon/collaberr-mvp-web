import styled from "@emotion/styled";
import CampaignDetail from "@/app/components/CampaignDetail";

const Container = styled.div`
  position: fixed;
  right: 400px;
  left: 240px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 32px;
`;

const PreviewText = styled.div`
  width: 90%;
  font-family: "Pretendard";
  font-size: 17px;
  font-weight: 600;
  line-height: 27px;
  letter-spacing: -0.015em;
  text-align: left;
  color: #8696ab;
`;

const PreviewInnerContainer = styled.div`
  overflow-y: scroll;
  overflow-x: hidden;
  height: 79vh;
  width: 90%;
  margin-top: 8px;
  padding: 16px 16px 30px 16px;
  border-radius: 16px;
  background-color: white;
  white-space: normal;
`;

interface props {
  brandName: string;
  title: string;
  thumbnailImageSrc: string;
  platform: string;
  category: string;
  shownStartDate: string;
  shownEndDate: string;
  description: string;
  missionType: string;
  bid: number | undefined;
  files: any;
}

export default function CampaignPreview({
  brandName,
  title,
  thumbnailImageSrc,
  platform,
  shownStartDate,
  shownEndDate,
  description,
  missionType,
  bid,
  files,
  category,
}: props) {
  return (
    <Container>
      <PreviewText>Preview</PreviewText>
      <PreviewInnerContainer>
        <CampaignDetail
          type={"create"}
          description={description}
          brandName={brandName}
          title={title}
          thumbnailImageSrc={thumbnailImageSrc}
          platform={platform}
          category={category}
          shownStartDate={shownStartDate}
          shownEndDate={shownEndDate}
          missionType={missionType}
          bid={bid}
          files={files}
        />
      </PreviewInnerContainer>
    </Container>
  );
}
