"use client";
import styled from "@emotion/styled";
import { usePathname } from "next/navigation";

import Follower from "./Follower";
import View from "./View";
import Action from "./Action";
import Upload from "./Upload";

interface TabItemProps {
  readonly isActive?: boolean;
}

const Container = styled.div`
  margin-top: 52px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;

  border-bottom: 1px solid #e6eaef;
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

const Body = styled.div`
  padding-top: 20px;
  padding-bottom: 124px;
`;

interface props {
  loadingVideos: boolean;
  loadingAnalysis: boolean;
  marginTop: number;
  channelVideos: any[];
  uploadAnalysis: any;
}

export default function Tab({
  loadingAnalysis,
  loadingVideos,
  marginTop = 52,
  channelVideos,
  uploadAnalysis,
}: props) {
  return (
    <Container style={{ marginTop: marginTop }}>
      {/* <Header>
        <TabItem onClick={() => changeTab("follower")}>
          팔로워
          {curTab === "follower" && <ActiveBorder />}
        </TabItem>
        <TabItem onClick={() => changeTab("view")}>
          콘텐츠 조회
          {curTab === "view" && <ActiveBorder />}
        </TabItem>
        <TabItem onClick={() => changeTab("action")}>
          콘텐츠 참여
          {curTab === "action" && <ActiveBorder />}
        </TabItem>
        <TabItem onClick={() => changeTab("upload")}>
          콘텐츠 업로드
          {curTab === "upload" && <ActiveBorder />}
        </TabItem>
      </Header>
      <Body>
        {curTab === "follower" && <Follower />}
        {curTab === "view" && <View />}
        {curTab === "action" && <Action />}
        {curTab === "upload" && (
          <Upload
            uploadAnalysis={uploadAnalysis}
            channelVideos={channelVideos}
          />
        )}
      </Body> */}
      <Header />
      <Body>
        <Upload
          loadingAnalysis={loadingAnalysis}
          loadingVideos={loadingVideos}
          uploadAnalysis={uploadAnalysis}
          channelVideos={channelVideos}
        />
      </Body>
    </Container>
  );
}
