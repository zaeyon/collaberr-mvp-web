import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import styled from "@emotion/styled";

ChartJS.register(ArcElement, Tooltip);

interface LegendMarkProps {
  legendColor: string;
}

const Container = styled.div`
  flex: 1;
  padding: 30px 24px;
  border-radius: 20px;
  border: 1px solid var(--gray-gray-200, #e6eaef);
  background: var(--white, #fff);
`;

const Title = styled.div`
  color: var(--gray-gray-900, #242d35);
  /* 큰본문 h7/Semibold */
  font-size: 17px;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  line-height: 160%;
  letter-spacing: -0.255px;
`;

const LegendDiv = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
`;

const LegendItem = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;

  :nth-of-type(n + 2) {
    margin-left: 20px;
  }
`;

const LegendMark = styled.span<LegendMarkProps>`
  width: 10px;
  height: 10px;
  border-radius: 10px;
  background-color: ${(props) => props.legendColor};
`;

const LegendLabel = styled.span`
  margin-left: 8px;
  color: var(--gray-gray-500, #8696ab);
  font-size: 13px;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  line-height: 160%;
  letter-spacing: -0.195px;
`;

const ChartDiv = styled.div`
  margin-top: 10px;
  padding: 23px 0px 23px 0px;
  position: relative;
`;

const MajorLegendDiv = styled.div`
  margin-top: 10px;
  top: 0px;
  left: 0px;
  align-items: center;
  justify-content: center;
  display: flex;
  position: absolute;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

interface props {
  data: any;
  title: string;
}

export default function DoughnutChart({ data, title }: props) {
  var options = {
    resposive: true,
    maintainAspectRatio: false,
  };

  return (
    <Container>
      <Title>{title}</Title>
      <LegendDiv>
        {data.labels.map((item: any, index: number) => {
          return (
            <LegendItem key={index}>
              <LegendMark
                legendColor={data.datasets[0].backgroundColor[index]}
              />
              <LegendLabel>{item}</LegendLabel>
            </LegendItem>
          );
        })}
      </LegendDiv>
      <ChartDiv>
        <Doughnut
          options={options}
          style={{ marginTop: 10, width: "100%" }}
          data={data}
        ></Doughnut>
        <MajorLegendDiv>
          <p>
            {
              data.labels[
                data.datasets[0].data.findIndex(
                  (item: number) => item === Math.max(...data.datasets[0].data)
                )
              ]
            }
          </p>
          <h3>
            {(
              (Math.max(...data.datasets[0].data) /
                data.datasets[0].data.reduce(
                  (sum: number, value: number) => (sum += value),
                  0
                )) *
              100
            ).toFixed(0) + "%"}
          </h3>
        </MajorLegendDiv>
      </ChartDiv>
    </Container>
  );
}
