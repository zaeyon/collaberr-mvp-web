"use client";
import { useState, useEffect } from "react";

// import Recoil State
import { useRecoilState, useRecoilValue } from "recoil";
import { allCreatorsTableListState, allCreatorsState } from "../recoil/creator";

// import Local Component
import CreatorList from "../components/Creators/CreatorList";
import CreatorDetail from "../components/Creators/CreatorDetail";

import { GET_showAllCreators } from "../api/creator";

export default function Creators() {
  const [isVisCreatorDetail, setIsVisCreatorDetail] = useState(false);
  const [allCreatorsData, setAllCreatorsData] =
    useRecoilState(allCreatorsState);
  const [curTab, setCurTab] = useState("follower");
  const [channelId, setChannelId] = useState("");
  const [loading, setLoading] = useState(
    allCreatorsData.length > 0 ? false : true
  );

  useEffect(() => {
    GET_showAllCreators()
      .then((res) => {
        console.log("GET_showAllCreators res", res);
        setAllCreatorsData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log("GET_showAllCreators fail", err);
        setLoading(false);
      });
  }, []);

  const openCreatorDetail = (channelId: string) => {
    setIsVisCreatorDetail(true);
    setChannelId(channelId);
  };

  const clickModalOutside = () => {
    setIsVisCreatorDetail(false);
  };

  const changeTab = (tab: string) => {
    setCurTab(tab);
  };

  return (
    <main>
      <h1>Creators</h1>
      <CreatorList
        loading={loading}
        allCreatorsData={allCreatorsData}
        openCreatorDetail={openCreatorDetail}
      />
      {isVisCreatorDetail && (
        <CreatorDetail
          channelId={channelId}
          clickModalOutside={clickModalOutside}
        />
      )}
    </main>
  );
}
