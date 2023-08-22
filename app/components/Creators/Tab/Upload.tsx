import { useEffect } from "react";
import styled from "@emotion/styled";
import { ColorRing } from "react-loader-spinner";

import Scoreboard from "../../Dashboard/Scoreboard";
import BarChart from "../../Dashboard/BarChart.jsx";
import YoutubePlayer from "../../YoutubePlayer";
import { Device } from "../../Device";

const Container = styled.div``;

const ChannelVideosDiv = styled.div`
  margin-top: 54px;
`;

const GridDiv = styled.div`
  margin-top: 28px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(307px, 307px));
  justify-content: space-between;
  row-gap: 20px;
`;
const LoadingDiv = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface props {
  loadingAnalysis: boolean;
  loadingVideos: boolean;
  channelVideos: any[];
  uploadAnalysis: any;
}

export default function Upload({
  channelVideos,
  uploadAnalysis,
  loadingAnalysis,
  loadingVideos,
}: props) {
  console.log("uploadAnalysis", uploadAnalysis);
  const SCOREBOARD_DATA = [
    {
      label: "등록된 영상 수 (최근 1달)",
      value: `${uploadAnalysis.recentlyUploadCount}개`,
    },
    {
      label: "평균 월간 업로드 (최근 1년)",
      value: `${(
        Object.values(uploadAnalysis.monthlyUploadCount).reduce(
          (sum: number, item: any) => (sum += item),
          0
        ) / 12
      ).toFixed(1)}개`,
    },
    {
      label: "최근 업로드",
      value: uploadAnalysis?.recentlyUploadElapsedTime,
    },
  ];

  const WEEKLY_UPLOAD_DATA = {
    legendArr: ["월간 업로드"],
    legendColorArr: ["#57C7B6"],
    labels: Object.keys(uploadAnalysis.monthlyUploadCount),
    datasets: [
      {
        labels: "country",
        data: Object.values(uploadAnalysis.monthlyUploadCount),
        backgroundColor: "#57C7B6",
        barPercentage: 0.36,
      },
    ],
  };

  return (
    <Container>
      <Device desktop>
        <Scoreboard loading={loadingAnalysis} data={SCOREBOARD_DATA} gap={30} />
      </Device>
      <BarChart
        loading={loadingAnalysis}
        marginTop={30}
        title={"월간 업로드 현황 (최근 1년)"}
        data={WEEKLY_UPLOAD_DATA}
      />
      <Device desktop>
        <ChannelVideosDiv>
          <h3>업로드한 콘텐츠</h3>
          {!loadingVideos && (
            <GridDiv>
              {channelVideos.map((videoItem: any, index: number) => {
                return <YoutubePlayer key={index} video={videoItem} />;
              })}
            </GridDiv>
          )}
          {loadingVideos && (
            <LoadingDiv>
              <ColorRing
                visible={true}
                height="43"
                width="43"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["#F25476", "#F25476", "#F25476", "#F25476", "#F25476"]}
              />
            </LoadingDiv>
          )}
          <div id="player"></div>
        </ChannelVideosDiv>
      </Device>
      <Device mobile>
        <ChannelVideosDiv>
          <h3>업로드한 콘텐츠</h3>
          {!loadingVideos && (
            <GridDiv style={{ justifyContent: "center" }}>
              {channelVideos.map((videoItem: any, index: number) => {
                return (
                  <YoutubePlayer
                    device={"mobile"}
                    key={index}
                    video={videoItem}
                  />
                );
              })}
            </GridDiv>
          )}
          {loadingVideos && (
            <LoadingDiv>
              <ColorRing
                visible={true}
                height="43"
                width="43"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["#F25476", "#F25476", "#F25476", "#F25476", "#F25476"]}
              />
            </LoadingDiv>
          )}
          <div id="player"></div>
        </ChannelVideosDiv>
      </Device>
    </Container>
  );
}
