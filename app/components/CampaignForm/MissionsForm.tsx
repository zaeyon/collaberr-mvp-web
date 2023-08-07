import styled from "@emotion/styled";

import InfoInput from "../InfoInput";
import InfoSelect from "../InfoSelect";
import FileInput from "../FileInput";

const MISSION_TYPE_DATA = [
  { id: 1, value: "Youtube Video" },
  { id: 2, value: "Youtube Shorts" },
  { id: 3, value: "Post" },
  { id: 4, value: "Story" },
  { id: 5, value: "Reel" },
  { id: 6, value: "IGTV" },
  { id: 7, value: "Tiktok Video" },
];

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
  missionType: string;
  bid: number | undefined;
  files: any;
  changeMissionType: (value: string) => void;
  changeBid: (e: React.ChangeEvent<HTMLInputElement>) => void;
  changeFiles: (value: string) => void;
  deleteFiles: (name: string) => void;
}

export default function MissionsForm({
  missionType,
  bid,
  files,
  changeMissionType,
  changeBid,
  changeFiles,
  deleteFiles,
}: props) {
  return (
    <Container>
      <SectionTitle>Missions</SectionTitle>
      <InfoSelect
        value={missionType}
        label={"Mission Type"}
        onChangeSelect={changeMissionType}
        placeholder={"Select mission type"}
        options={MISSION_TYPE_DATA}
      />
      <InfoInput
        value={bid}
        onChangeInput={changeBid}
        type={"number"}
        label={"Campaign Bid"}
        placeholder={"Select bidding amount"}
      />
      {/* <FileInput
            type={"many"}
            value={files}
            label={"Additional Files"}
            placeholder={"Select additional files from your device"}
            description={"docx, pdf, png, jpeg files are accepted"}
            changeFile={changeFiles}
            accept={".docx, .pdf, image/*"}
            deleteFiles={deleteFiles}
            /> */}
    </Container>
  );
}
