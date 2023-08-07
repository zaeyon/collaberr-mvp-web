"use client";
import styled from "@emotion/styled";

import DoughnutChart from "@/app/components/Dashboard/DoughnutChart";
import BarChart from "@/app/components/Dashboard/BarChart.jsx";

const Container = styled.div`
  padding: 40px 0px 200px 0px;
`;

const TwoChartsDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
`;

const BarChartDiv = styled.div`
  margin-top: 40px;
`;

export default function Targets() {
  return (
    <Container>
      <TwoChartsDiv>
        <DoughnutChart title={"유입 고객 성별"} data={GENDER_RATE_DATA} />
        <DoughnutChart title={"유입 고객 연령대"} data={AGE_RATE_DATA} />
      </TwoChartsDiv>
      <BarChartDiv>
        <BarChart
          title={"상위 시청 국가"}
          subTitle={"상위 10개국까지만 볼 수 있어요."}
          data={COUNTRY_RATE_DATA}
        />
      </BarChartDiv>
    </Container>
  );
}

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

const COUNTRY_RATE_DATA = {
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
