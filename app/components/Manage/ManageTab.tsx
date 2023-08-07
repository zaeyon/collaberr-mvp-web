import Image from "next/image";
import styled from "@emotion/styled";

import Button from "../Button";
import icon_exit from "@/app/assets/icons/icon_exit.png";
import { campaignType } from "@/app/type/campaign";

interface TabItemProps {
  readonly isActive: boolean;
}

const Container = styled.div`
  height: 190px;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  height: 38px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const DateDiv = styled.div`
  height: 27px;
  margin-top: 8px;
  color: var(--gray-gray-600, #536878);
  font-family: "Pretendard";
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%;
  letter-spacing: -0.255px;
`;

const ExitIcon = styled(Image)`
  position: fixed;
  top: 95px;
  right: 32px;
`;

const TabsDiv = styled.div`
  margin-top: 32px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const TabItem = styled.span<TabItemProps>`
  border-radius: 24px;
  background-color: ${(props) => (props.isActive ? "#F1F4F7" : "#FFFFFF")};
  padding: 10px 18px;
  color: ${(props) => (props.isActive ? "#242D35" : "#536878")};
  font-family: "Pretendard";
  font-size: 17px;
  font-style: normal;
  font-weight: 600;
  line-height: 160%;
  letter-spacing: -0.255px;
  cursor: pointer;
`;

interface props {
  moveToCampaignDetail: () => void;
  changeTab: (tab: string) => void;
  pathname: string;
  campaignItem: campaignType;
}

export default function ManageTab({
  moveToCampaignDetail,
  changeTab,
  pathname,
  campaignItem,
}: props) {
  return (
    <Container>
      <div style={{ marginBottom: 10, color: "#8696AB", fontSize: 15 }}>
        ⚠️ 현재 캠페인 관리 화면은 서비스 준비중으로 더미 데이터로
        처리하였습니다.
      </div>
      <Header>
        <h2>{campaignItem.title}</h2>
        <Button
          onClick={moveToCampaignDetail}
          style={"tertiery"}
          size={"xsmall"}
          state={"default"}
          label={"캠페인 보기"}
        />
      </Header>
      <DateDiv>
        {campaignItem.start_date
          ? `${campaignItem.start_date} - ${campaignItem.end_date}`
          : ""}
      </DateDiv>
      <TabsDiv>
        <TabItem
          onClick={() => changeTab("recruit")}
          isActive={
            !pathname.includes("content") && !pathname.includes("result")
          }
        >
          {"모집 관리"}
        </TabItem>
        <TabItem
          onClick={() => changeTab("content")}
          isActive={pathname.includes("content")}
        >
          {"콘텐츠 관리"}
        </TabItem>
        {/* <TabItem
                onClick={() => changeTab("result")}
                isActive={pathname.includes("result")}>
                    {"성과 보기"}
                </TabItem> */}
      </TabsDiv>
    </Container>
  );
}
