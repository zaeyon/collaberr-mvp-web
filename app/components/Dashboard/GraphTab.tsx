"use client";
import styled from "@emotion/styled";

import Graph from "./Graph";
import Tooltip from "../Tooltip";

interface TabItemProps {
  isActive: boolean;
}

const Container = styled.div``;

const TabHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const TabItem = styled.div<TabItemProps>`
  flex: 1;
  padding: 16px 24px 36px 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${(props) => (props.isActive ? "#ffffff" : "#F7F9FB")};
  border-top: 1px solid var(--gray-gray-200, #e6eaef);
  border-bottom: ${(props) =>
    props.isActive ? "none" : "1px solid var(--gray-gray-200, #E6EAEF)"};
  border-right: 1px solid var(--gray-gray-200, #e6eaef);
  cursor: pointer;

  :nth-of-type(1) {
    border-top-left-radius: 20px;
    border-left: 1px solid var(--gray-gray-200, #e6eaef);
  }

  :nth-last-of-type(1) {
    border-top-right-radius: 20px;
  }
`;

const TabLabelDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TabLabel = styled.span`
  color: var(--gray-gray-600, #536878);
  text-align: center;
  font-size: 15px;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  line-height: 160%;
  letter-spacing: -0.225px;
`;

const TabValue = styled.div`
  margin-top: 8px;
  color: var(--gray-gray-900, #242d35);
  text-align: center;
  font-size: 21px;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 500;
  line-height: 160%;
  letter-spacing: -0.315px;
`;

const GraphDiv = styled.div`
  padding: 30px 24px 68px 24px;
  background-color: white;

  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  border-bottom: 1px solid var(--gray-gray-200, #e6eaef);
  border-left: 1px solid var(--gray-gray-200, #e6eaef);
  border-right: 1px solid var(--gray-gray-200, #e6eaef);
`;

const ChangeDescription = styled.div`
  margin-top: 8px;
  color: var(--teal-teal-600, #3ab09e);
  text-align: center;
  font-size: 13px;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  line-height: 160%;
  letter-spacing: -0.195px;
`;

interface props {
  marginTop?: number;
  tabs: any[];
  curTab: string;
  changeTab: (tab: string, data: number[]) => void;
  graphData: any;
}

export default function GraphTab({
  tabs,
  curTab,
  changeTab,
  graphData,
  marginTop,
}: props) {
  return (
    <Container style={{ marginTop: marginTop }}>
      <TabHeader>
        {tabs.map((item: any, index: number) => {
          return (
            <TabItem
              onClick={() => changeTab(item.label, item.data)}
              isActive={curTab === item.label}
              key={index}
            >
              <TabLabelDiv>
                <TabLabel>{item.label}</TabLabel>
                {item.description && (
                  <Tooltip
                    iconType={"info"}
                    description={item.description}
                    tooltipWidth={item.tooltipWidth ? item.tooltipWidth : 214}
                  />
                )}
              </TabLabelDiv>
              <TabValue>{item.value}</TabValue>
              {item.change && (
                <ChangeDescription
                  style={{
                    color: item.change === "increase" ? "#3AB09E" : "#3183F6",
                  }}
                >
                  {item.changeDescription}
                </ChangeDescription>
              )}
            </TabItem>
          );
        })}
      </TabHeader>
      <GraphDiv>
        <Graph data={graphData} />
      </GraphDiv>
    </Container>
  );
}
