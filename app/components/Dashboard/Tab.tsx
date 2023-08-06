"use client";
import styled from "@emotion/styled";
import { usePathname } from "next/navigation";

interface TabItemProps {
  readonly isActive?: boolean;
}

const Container = styled.div`
  margin-top: 52px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;

  border-bottom: 1px solid #d1d7df;
`;

const TabItem = styled.div<TabItemProps>`
  position: relative;
  color: var(--secondary-gray-gray-900, #242d35);
  font-weight: 400;
  font-size: 17px;
  font-family: "Pretendard";
  line-height: 160%;
  letter-spacing: -0.255px;
  padding-bottom: 12px;

  //border-bottom: ${(props) =>
    props.isActive ? "1.5px solid #242D35" : "none"};
  cursor: pointer;

  :nth-of-type(n + 2) {
    margin-left: 24px;
  }
`;

const ActiveBorder = styled.div`
  position: absolute;
  bottom: -1px;
  width: 100%;
  height: 1.5px;
  background-color: #f25476;
`;

interface props {
  marginTop: number;
  root: string;
  changeTab: (tab: string) => void;
}

export default function Tab({ changeTab, root, marginTop = 52 }: props) {
  const pathname = usePathname();
  const pathnameEnd = pathname.split("/")[pathname.split("/").length - 1];

  return (
    <Container style={{ marginTop: marginTop }}>
      <Header>
        {root === "dashboard" && (
          <TabItem onClick={() => changeTab("/")}>
            캠페인 현황
            {pathnameEnd === "dashboard" && <ActiveBorder />}
          </TabItem>
        )}
        {/* <TabItem
                onClick={() => changeTab("/overview")}>
                    성과 요약
                    {pathnameEnd === "overview" && (
                    <ActiveBorder/>
                    )}
                </TabItem> */}
        {/* <TabItem onClick={() => changeTab("/views")}>
          캠페인 조회
          {pathnameEnd === "views" && <ActiveBorder />}
        </TabItem>
        <TabItem onClick={() => changeTab("/actions")}>
          캠페인 행동
          {pathnameEnd === "actions" && <ActiveBorder />}
        </TabItem> */}
        <TabItem onClick={() => changeTab("/targets")}>
          캠페인 고객
          {pathnameEnd === "targets" && <ActiveBorder />}
        </TabItem>
      </Header>
    </Container>
  );
}
