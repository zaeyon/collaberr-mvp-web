"use client";
import styled from "@emotion/styled";

import DoughnutChart from "@/app/components/Dashboard/DoughnutChart";
import BarChart from "@/app/components/Dashboard/BarChart";

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
  legendArr: ["조회수"],
  legendColorArr: ["#57C7B6"],
  labels: [
    "미국",
    "영국",
    "프랑스",
    "독일",
    "캐나다",
    "이탈리아",
    "멕시코",
    "네덜란드",
    "덴마크",
    "스위스",
  ],
  datasets: [
    {
      labels: "country",
      data: [300, 240, 200, 200, 180, 150, 100, 50, 40, 15],
      backgroundColor: "#57C7B6",
      barPercentage: 0.36,
    },
  ],
};
