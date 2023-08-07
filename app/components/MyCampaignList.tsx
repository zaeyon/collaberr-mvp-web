"use client";
import { useRouter } from "next/navigation";
import styled from "@emotion/styled";
import { useRecoilValue } from "recoil";
import { myCampaignsState } from "../recoil/campaign";

import Button from "./Button";
import ListTable from "./ListTable";
import MyCampaignsTableItem from "./Campaigns/MyCampaignsTableItem";

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

interface props {
  loading: boolean;
  moveToCampaignDetail: (campaignId: number) => void;
  moveToCampaignManage: (event: any, campaignId: number) => void;
}

export default function MyCampaignList({
  loading,
  moveToCampaignDetail,
  moveToCampaignManage,
}: props) {
  const myCampaigns = useRecoilValue(myCampaignsState);

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
      <ListTable
        loading={loading}
        data={myCampaigns}
        tableMarginTop={14}
        headerColumns={MY_CAMPAIGNS_TABLE_HEADER}
        emptyTitle={"아직 등록된 캠페인이 없습니다."}
        emptyDescrip={"새로운 캠페인을 생성해주세요."}
        moveToCampaignDetail={moveToCampaignDetail}
        renderTableItem={(item: any) => (
          <MyCampaignsTableItem
            key={item.id}
            campaignData={item}
            moveToCampaignDetail={moveToCampaignDetail}
            moveToCampaignManage={moveToCampaignManage}
          />
        )}
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
