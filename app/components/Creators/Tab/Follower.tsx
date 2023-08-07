import styled from "@emotion/styled";

import Scoreboard from "../../Dashboard/Scoreboard";
import DoughnutChart from "../../Dashboard/DoughnutChart";
import BarChart from "../../Dashboard/BarChart.jsx";

const Container = styled.div``;

const DoughnutChartsDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 30px;
  margin-top: 30px;
`;

export default function Follower({}) {
  return (
    <Container>
      <Scoreboard gap={30} data={SCOREBOARD_DATA} />
      <DoughnutChartsDiv>
        <DoughnutChart title={"팔로워 성별 분포"} data={GENDER_RATE_DATA} />
        <DoughnutChart title={"팔로워 연령대"} data={AGE_RATE_DATA} />
      </DoughnutChartsDiv>
      <BarChart
        marginTop={30}
        title={"팔로워 증감 (최근 30일)"}
        data={FOLLOWER_RATE_DATA}
      />
      <BarChart
        marginTop={30}
        title={"상위 시청 국가"}
        subTitle={"상위 10개국까지만 볼 수 있어요."}
        data={COUNTRY_RATE_DATA}
      />
    </Container>
  );
}

const SCOREBOARD_DATA = [
  {
    label: "주 시청 고객층",
    value: "여성 · 25-34세",
  },
  {
    label: "주 시청 국가",
    value: "인도네시아",
  },
];

const GENDER_RATE_DATA = {
  labels: ["남성", "여성"],
  datasets: [
    {
      data: [54, 46],
      backgroundColor: ["#75D1C3", "#3AB09E"],
      borderColor: ["#75D1C3", "#3AB09E"],
      borderWidth: 1,
    },
  ],
};

const AGE_RATE_DATA = {
  labels: ["10대", "20대", "30대", "40대", "50대 이상"],
  datasets: [
    {
      data: [100, 120, 230, 50, 77],
      backgroundColor: ["#45A2FF", "#3183F6", "#75D1C3", "#3AB09E", "#246B60"],
      borderColor: ["#45A2FF", "#3183F6", "#75D1C3", "#3AB09E", "#246B60"],
      borderWidth: 1,
    },
  ],
};

const FOLLOWER_RATE_DATA = {
  legendArr: ["획득 구독자", "잃은 구독자"],
  legendColorArr: ["#57C7B6", "#B981EE"],
  labels: [
    "Attr",
    "Attr",
    "Attr",
    "Attr",
    "Attr",
    "Attr",
    "Attr",
    "Attr",
    "Attr",
    "Attr",
  ],
  datasets: [
    {
      labels: "획득 구독자",
      data: [50, 50, 100, 20, 60, 150, 0, 50, 100, 150],
      backgroundColor: "#57C7B6",
      barPercentage: 0.36,
      borderSkipped: false,
    },
    {
      labels: "잃은 구독자",
      data: [-30, -20, -20, -50, -100, -200, 75, -150, 0, -150],
      backgroundColor: "#B981EE",
      barPercentage: 0.36,
      borderSkipped: false,
    },
  ],
};

const COUNTRY_RATE_DATA = {
  legendArr: ["조회수"],
  legendColorArr: ["#57C7B6"],
  labels: [
    "Country 1",
    "Country 2",
    "Country 3",
    "Country 4",
    "Country 5",
    "Country 6",
    "Country 7",
    "Country 8",
    "Country 9",
    "Country 10",
  ],
  datasets: [
    {
      labels: "country",
      data: [30, 50, 100, 20, 60, 200, 0, 50, 100, 150],
      backgroundColor: "#57C7B6",
      barPercentage: 0.36,
    },
  ],
};
