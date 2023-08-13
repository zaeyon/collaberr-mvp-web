"use client";
import { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { useRecoilState, useRecoilValue } from "recoil";
import { myCampaignsState, campaignStatusTableState } from "../recoil/campaign";

import { GET_showMyCampaigns } from "../api/campaign";
import Scoreboard from "../components/Dashboard/Scoreboard";
import ListTable from "../components/ListTable";
import GraphTab from "../components/Dashboard/GraphTab";
import { getCookie } from "../lib/cookie";

const Container = styled.div`
  padding: 40px 0px;
`;

export default function Dashboard() {
  const [myCampaigns, setMyCampaigns] = useRecoilState(myCampaignsState);
  const campaignStatusTableList = useRecoilValue(campaignStatusTableState);
  const totalInvestmentCost = useRef<number>();
  const totalViews = useRef<number>();
  const totalParticipation = useRef<number>();
  const [rewardGraphCurTab, setRewardGraphCurTab] = useState(
    REWARD_GRAPH_DATA[0].label
  );
  const [rewardGraphData, setRewardGraphData] = useState<any>(
    REWARD_GRAPH_DATA[0].data
  );

  const [actionGraphCurTab, setActionGraphCurTab] = useState(
    ACTION_GRAPH_DATA[0].label
  );
  const [actionGraphData, setActionGraphData] = useState<any>(
    ACTION_GRAPH_DATA[0].data
  );

  const changeRewardGraphTab = (tab: string, data: number[]) => {
    setRewardGraphCurTab(tab);
    setRewardGraphData(data);
  };
  const changeActionGraphTab = (tab: string, data: number[]) => {
    setActionGraphCurTab(tab);
    setActionGraphData(data);
  };

  useEffect(() => {
    GET_showMyCampaigns()
      .then((res) => {
        console.log("GET_showMyCampaigns success", res);
        const accountId = getCookie("account_id");
        setMyCampaigns(
          res.reverse().filter((item: any) => item.owner === accountId)
        );
        totalInvestmentCost.current = res.reduce((sum: number, item: any) => {
          return (sum += item.reward * item.approved_creators.length);
        }, 0);
        totalParticipation.current = res.reduce((sum: number, item: any) => {
          return (sum += item.approved_creators.length);
        }, 0);
      })
      .catch((err) => {
        console.log("GET_showMyCampaign err", err);
      });
  }, []);

  const SCOREBOARD_DATA = [
    {
      label: "진행중인 캠페인",
      value: myCampaigns.length ? `${myCampaigns.length}개` : "-",
    },
    {
      label: "전체 투자 비용",
      value:
        totalInvestmentCost.current !== undefined
          ? `$${totalInvestmentCost.current.toLocaleString()}`
          : "-",
    },
    {
      label: "전체 참여수",
      value:
        totalParticipation.current !== undefined
          ? `${totalParticipation.current}회`
          : "-",
    },
  ];

  return (
    <Container>
      <Scoreboard data={SCOREBOARD_DATA} />
      {/* <ListTable
        tableMarginTop={40}
        headerColumns={CAMPAIGN_RAKING_TABLE_HEADER}
        data={campaignStatusTableList}
        emptyTitle={"아직 등록된 캠페인이 없습니다."}
        emptyDescrip={"새로운 캠페인을 생성해주세요"}
      /> */}
      <GraphTab
        marginTop={40}
        curTab={rewardGraphCurTab}
        tabs={REWARD_GRAPH_DATA}
        changeTab={changeRewardGraphTab}
        graphData={rewardGraphData}
      />
      <GraphTab
        marginTop={40}
        curTab={actionGraphCurTab}
        tabs={ACTION_GRAPH_DATA}
        changeTab={changeActionGraphTab}
        graphData={actionGraphData}
      />
    </Container>
  );
}

const REWARD_GRAPH_DATA = [
  {
    label: "평균 지출 대비 수익",
    value: "10.2%",
    data: {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          legend: { label: "지출", color: "#B981EE" },
          data: [10, 20, 50, 100, 60, 80, 50],

          borderColor: "#B981EE",
          backgroundColor: "#B981EE",
          borderWidth: 2.8,
          lineTension: 0.35,
        },
        {
          legend: { label: "수익", color: "#57C7B6" },
          data: [0, 20, 25, 90, 180, 185, 200],
          borderColor: "#57C7B6",
          backgroundColor: "#57C7B6",
          borderWidth: 2.8,
          lineTension: 0.35,
        },
      ],
    },
    description: "평균 수익 / 평균 지출",
  },
  {
    label: "조회수당 가격",
    value: "$4.2",
    data: {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          legend: { label: "총 조회수", color: "#57C7B6" },
          data: [10, 50, 500, 0, 1, 66, 2],
          borderColor: "#57C7B6",
          backgroundColor: "#57C7B6",
          borderWidth: 2.8,
          lineTension: 0.35,
        },
        {
          legend: { label: "총 조회수", color: "#57C7B6" },
          data: [10, 20, 25, 50, 40, 60, 80],
          borderColor: "#B981EE",
          backgroundColor: "#B981EE",
          borderWidth: 2.8,
          lineTension: 0.35,
        },
      ],
    },
  },
  {
    label: "이벤트당 평균가격",
    value: "$3.1",
    description: "이것은 툴팁입니다. 툴팁 안의 텍스트를 입력해주세요",
    data: {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          legend: { label: "총 조회수", color: "#57C7B6" },
          data: [10, 20, 50, 100, 1, 66, 2],
          borderColor: "#57C7B6",
          backgroundColor: "#57C7B6",
          borderWidth: 2.8,
          lineTension: 0.35,
        },
        {
          legend: { label: "총 조회수", color: "#57C7B6" },
          data: [10, 20, 25, 50, 40, 60, 80],
          borderColor: "#B981EE",
          backgroundColor: "#B981EE",
          borderWidth: 2.8,
          lineTension: 0.35,
        },
      ],
    },
  },
];

const ACTION_GRAPH_DATA = [
  {
    label: "전체 참여",
    value: "53,230",
    description: "전체 참여 수 = 공유 수 + 댓글 수 + 좋아요 수",
    tooltipWidth: 280,
    change: "increase",
    changeDescription: "한달 전 보다 10% 증가했어요",
    data: {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          legend: { label: "총 조회수", color: "#57C7B6" },
          data: [10, 20, 50, 100, 1, 66, 2],
          borderColor: "#57C7B6",
          backgroundColor: "#57C7B6",
          borderWidth: 2.8,
          lineTension: 0.35,
        },
        {
          legend: { label: "순 조회수", color: "#B981EE" },
          data: [10, 20, 25, 50, 40, 60, 80],
          borderColor: "#B981EE",
          backgroundColor: "#B981EE",
          borderWidth: 2.8,
          lineTension: 0.35,
        },
      ],
    },
  },
  {
    label: "공유 횟수",
    value: "7,322",
    description: "이것은 툴팁입니다.\n 툴팁 안의 텍스트를 입력해주세요",
    change: "decrease",
    changeDescription: "한달 전 보다 20% 감소했어요",
    data: {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          legend: { label: "총 조회수", color: "#57C7B6" },
          data: [300, 200, 120, 500, 100, 263, 332],
          borderColor: "#57C7B6",
          backgroundColor: "#57C7B6",
          borderWidth: 2.8,
          lineTension: 0.35,
        },
        {
          legend: { label: "총 조회수", color: "#57C7B6" },
          data: [523, 232, 250, 150, 620, 230, 80],
          borderColor: "#B981EE",
          backgroundColor: "#B981EE",
          borderWidth: 2.8,
          lineTension: 0.35,
        },
      ],
    },
  },
  {
    label: "댓글 수",
    value: "12,300",
    description: "이것은 툴팁입니다.\n 툴팁 안의 텍스트를 입력해주세요",
    change: "decrease",
    changeDescription: "한달 전 보다 20% 감소했어요",
    data: {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          legend: { label: "총 조회수", color: "#57C7B6" },
          data: [120, 252, 523, 400, 531, 623, 223],
          borderColor: "#57C7B6",
          backgroundColor: "#57C7B6",
          borderWidth: 2.8,
          lineTension: 0.35,
        },
        {
          legend: { label: "총 조회수", color: "#57C7B6" },
          data: [152, 220, 555, 740, 440, 610, 840],
          borderColor: "#B981EE",
          backgroundColor: "#B981EE",
          borderWidth: 2.8,
          lineTension: 0.35,
        },
      ],
    },
  },
  {
    label: "좋아요 수",
    value: "12,300",
    description: "이것은 툴팁입니다.\n툴팁 안의 텍스트를 입력해주세요",
    change: "decrease",
    changeDescription: "한달 전 보다 20% 감소했어요",
    data: {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          legend: { label: "총 조회수", color: "#57C7B6" },
          data: [150, 203, 505, 600, 132, 442, 324],
          borderColor: "#57C7B6",
          backgroundColor: "#57C7B6",
          borderWidth: 2.8,
          lineTension: 0.35,
        },
        {
          legend: { label: "총 조회수", color: "#57C7B6" },
          data: [500, 660, 235, 640, 230, 660, 800],
          borderColor: "#B981EE",
          backgroundColor: "#B981EE",
          borderWidth: 2.8,
          lineTension: 0.35,
        },
      ],
    },
  },
];
