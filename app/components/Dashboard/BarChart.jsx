import styled from "@emotion/styled";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import LegendList from "./LegendList";
import {ColorRing} from 'react-loader-spinner';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 430px;
  padding: 30px 24px;
  border-radius: 20px;
  border: 1px solid var(--gray-gray-200, #e6eaef);
  background-color: white;
`;

const ChartDiv = styled.div`
  margin-top: 10px;
  height: 100%;
  position: relative;
`;

const LoadingDiv = styled.div`
top: 0px;
width: 100%;
height: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
`

const options = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      labels: {
        // This more specific font property overrides the global property
        font: {
          size: 140,
        },
      },
    },
  },
  animation: {
    x: {
      duration: 0,
      from: 100,
    },
    y: {
      duration: 1000,
      from: 2000,
    },
  },

  scales: {
    x: {
      stacked: true,
      display: true,
      border: {
        width: 1,
        dash: [2, 2],
      },
      ticks: {
        color: "#8696AB",
      },
    },

    y: {
      display: true,
      border: {
        width: 1,
        dash: [2, 2],
      },
      ticks: {
        color: "#8696AB",
      },
    },
  },
};

// interface props {
//   title: string;
//   data: any;
//   subTitle?: string;
//   marginTop?: number;
// }

export default function BarChart({
  loading = false,
  title,
  data,
  subTitle = "",
  marginTop = 0,
}) {
  return (
    <Container style={{ marginTop: marginTop }}>
      <h4>{title}</h4>
      {subTitle && <p style={{ marginTop: 2 }}>{subTitle}</p>}
      <LegendList
        legendArr={data.legendArr}
        legendColorArr={data.legendColorArr}
      />
      <ChartDiv>
        <Bar options={options} data={data} />
        <LoadingDiv>
          {loading && (
           <ColorRing
              visible={true}
              height="43"
              width="43"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={["#F25476", "#F25476", "#F25476", "#F25476", "#F25476"]}
          />
          )}
          </LoadingDiv>
      </ChartDiv>
             

    </Container>
  );
}
