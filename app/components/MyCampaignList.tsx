"use client";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import styled from "@emotion/styled";
import { useRecoilValue } from "recoil";

import {
  myCampaignsState,
  myCampaignsTableListState,
} from "../recoil/campaign";
import Button from "./Button";
import MyCampaignListItem from "./MyCampaignListItem";
import ListTable from "./ListTable";

const DynamicListTable = dynamic(() => import("./ListTable"), {
  ssr: false,
});

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  margin-top: 56px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const TableContainer = styled.div`
  margin-top: 14px;
`;

const TableColumn = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #f1f4f7;
`;

const ColumnItem = styled.div`
  min-width: 0px;
  display: flex;
  justify-content: center;
  padding-top: 8px;
  padding-bottom: 8px;
  font-family: "Pretendard";
  font-size: 15px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: -0.015em;
  color: #35424c;
`;

const ColumnSpan = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

interface props {
  moveToCampaignDetail: (campaignId: number) => void;
}

export default function MyCampaignList({ moveToCampaignDetail }: props) {
  const myCampaigns = useRecoilValue(myCampaignsTableListState);

  const router = useRouter();

  return (
    <Container>
      <Header>
        <h3>전체 캠페인</h3>
        <Button
          size={"small"}
          style={"primary"}
          label={"신규 캠페인"}
          state={"default"}
          onClick={() => router.push("/mycampaigns/create")}
        />
      </Header>
      <DynamicListTable
        data={myCampaigns}
        tableMarginTop={14}
        headerColumns={MY_CAMPAIGNS_TABLE_HEADER}
        emptyTitle={"아직 등록된 캠페인이 없습니다."}
        emptyDescrip={"새로운 캠페인을 생성해주세요."}
        moveToCampaignDetail={moveToCampaignDetail}
      />
    </Container>
  );
}

const MY_CAMPAIGNS_TABLE_HEADER = [
  {
    label: "State",
    width: "9.37",
  },
  {
    label: "Campaign",
    width: "44.27",
  },
  {
    label: "플랫폼",
    width: "5.73",
  },
  {
    label: "종류",
    width: "10.41",
  },
  {
    label: "기간",
    width: "20.82",
  },
  {
    label: "캠패인 관리",
    width: "9.37",
  },
];
