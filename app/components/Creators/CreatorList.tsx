"use client";
import { useState } from "react";
import styled from "@emotion/styled";

import ListTable from "../ListTable";
import CreatorsTableItem from "./CreatorsTableItem";
import default_profile_image from "@/app/assets/icons/icon_profile-fill.png";
import SkeletonCreatorsTableItem from "../loader/SkeletonCreatorsTableItem";

interface PlatformItemProps {
  platform: string;
  curPlatform: string;
}

const Container = styled.div`
  margin-top: 32px;
`;

const SelectPlatformDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
`;

const PlatformItem = styled.div<PlatformItemProps>`
  display: flex;
  padding: 10px 18px;
  border-radius: 24px;
  background-color: ${(props) =>
    props.platform === props.curPlatform ? "#F1F4F7" : "white"};
  color: ${(props) =>
    props.platform === props.curPlatform ? "#242D35" : "#D1D7DF"};
  font-family: "Pretendard";
  font-size: 17px;
  font-style: normal;
  font-weight: 600;
  line-height: 160%; /* 27.2px */
  letter-spacing: -0.255px;
  cursor: pointer;
`;

interface props {
  loading: boolean;
  allCreatorsData: any;
  openCreatorDetail: (channelId: string) => void;
}

export default function CreatorList({
  loading,
  openCreatorDetail,
  allCreatorsData,
}: props) {
  const [curPlatform, setCurPlatform] = useState("youtube");

  const changeCurPlatform = (platform: string) => {
    setCurPlatform(platform);
  };

  return (
    <Container>
      <SelectPlatformDiv>
        <PlatformItem
          onClick={() => changeCurPlatform("youtube")}
          platform={"youtube"}
          curPlatform={curPlatform}
        >
          유튜브
        </PlatformItem>
        {/* <PlatformItem
          style={{ cursor: "default", userSelect: "none" }}
          onClick={() => 0}
          platform={"instagram"}
          curPlatform={curPlatform}
        >
          인스타그램
        </PlatformItem> */}
      </SelectPlatformDiv>
      <ListTable
        loading={loading}
        marginTop={48}
        tableMarginTop={8}
        headerColumns={CREATORS_TABLE_HEADER}
        data={allCreatorsData}
        emptyTitle={"아직 등록된 크리에이터가 없습니다."}
        renderTableItem={(item: any) => (
          <CreatorsTableItem
            key={item.channel_id}
            creatorData={item}
            openCreatorDetail={openCreatorDetail}
          />
        )}
        renderSkeletonItem={() => <SkeletonCreatorsTableItem />}
      />
    </Container>
  );
}

const CREATORS_TABLE_HEADER = [
  {
    label: "channelId",
    width: 0,
  },
  {
    label: "profileImage",
    width: 0,
  },
  {
    label: "채널명",
    width: "29.16",
  },
  {
    label: "타입",
    width: "10.41",
  },
  {
    label: "주 시청 고객",
    width: "14.58",
  },
  {
    label: "구독자 수",
    width: "12.5",
  },
  {
    label: "평균 조회수",
    width: "12.5",
  },
  {
    label: "업로드 수",
    width: "12.5",
  },
  {
    label: "분석",
    width: "8.3",
  },
];

const CREATORS_TABLE_DATA = [
  {
    //profile_image: default_profile_image,
    name: "채널명",
    type: "뷰티",
    target: "여성 · 25-34세",
    subscriber: "10k",
    view: "10k",
    upload: "2323",
    analyze: "http://localhost:3000",
  },
  {
    //profile_image: default_profile_image,
    name: "채널명",
    type: "뷰티",
    target: "여성 · 25-34세",
    subscriber: "10k",
    view: "10k",
    upload: "2323",
    analyze: "http://localhost:3000",
  },
  {
    //profile_image: default_profile_image,
    name: "채널명",
    type: "뷰티",
    target: "여성 · 25-34세",
    subscriber: "10k",
    view: "10k",
    upload: "2323",
    analyze: "http://localhost:3000",
  },
  {
    //profile_image: default_profile_image,
    name: "채널명",
    type: "뷰티",
    target: "여성 · 25-34세",
    subscriber: "10k",
    view: "10k",
    upload: "2323",
    analyze: "http://localhost:3000",
  },
  {
    //profile_image: default_profile_image,
    name: "채널명",
    type: "뷰티",
    target: "여성 · 25-34세",
    subscriber: "10k",
    view: "10k",
    upload: "2323",
    analyze: "http://localhost:3000",
  },
];
