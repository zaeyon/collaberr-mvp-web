"use client";
import { SetStateAction, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useRouter } from "next/navigation";
import styles from "./page.module.scss";
import Image from "next/image";
import { allCampaignsState } from "./recoil/campaign";
import { allCreatorsState } from "./recoil/creator";

import CampaignCarousel from "./components/CampaignCarousel";
import Button from "./components/Button";
import CreatorRanking from "./components/CreatorRanking";
import CreatorDetail from "./components/Creators/CreatorDetail";
import { GET_showAllCampaigns } from "./api/campaign";
import { GET_showAllCreators } from "./api/creator";

import icon_chevron_right from "@/app/assets/icons/icon_chevron-right.png";

export default function Home() {
  const [allCampaigns, setAllCampaigns] = useRecoilState(allCampaignsState);
  const [allCreators, setAllCreators] = useRecoilState(allCreatorsState);
  const [creatorRankingData, setCreatorRankingData] = useState([]);
  const [isVisCreatorDetail, setIsVisCreatorDetail] = useState(false);
  const [loading, setLoading] = useState(
    allCampaigns.length > 0 ? false : true
  );
  const [loadingCreators, setLoadingCreators] = useState(
    allCreators.length > 0 ? false : true
  );
  const [curCategory, setCurCategory] = useState({
    value: "all",
    kr: "전체",
  });
  const [channelId, setChannelId] = useState("");

  const router = useRouter();

  const selectCategory = (category: any) => {
    setCurCategory(category);

    if (category.value === "all") setCreatorRankingData(allCreators);
    else {
      const selectedCategoryRaking = allCreators.filter(
        (creator: any) => creator.channel_type === category.kr
      );

      setCreatorRankingData(selectedCategoryRaking);
    }
  };
  const openCreatorDetail = (channelId: string) => {
    setIsVisCreatorDetail(true);
    setChannelId(channelId);
  };
  const clickModalOutside = () => {
    setIsVisCreatorDetail(false);
  };

  useEffect(() => {
    console.time("GET_showAllCampaigns");
    GET_showAllCampaigns()
      .then((res) => {
        console.timeEnd("GET_showAllCampaigns");
        console.log("GET_showAllCampaigns sucess", res);
        setLoading(false);
        setAllCampaigns(res);
      })
      .catch((err) => {
        setLoading(false);
        console.log("GET_showAllCampaign fail", err);
      });

    GET_showAllCreators()
      .then((res) => {
        console.log("GET_showAllCreators success", res);
        setAllCreators(res);
        setCreatorRankingData(res);
        setLoadingCreators(false);
      })
      .catch((err) => {
        console.log("GET_showAllCreators fail err", err);
        setLoadingCreators(false);
      });
  }, []);

  return (
    <main className={styles.container}>
      <h3 className={styles.title}>인기 캠페인</h3>
      <div className={styles.descriptionDiv}>
        <p className={styles.description}>
          지금 크리에이터들에게 가장 인기있는 캠페인
        </p>
        <div
          onClick={() => router.push("/campaigns")}
          className={styles.showAll}
        >
          전체보기
          <Image
            width={20}
            height={20}
            src={icon_chevron_right}
            alt={"icon_chevron_right"}
          />
        </div>
      </div>
      <div className={styles.popularCampaigns}>
        <CampaignCarousel loading={loading} campaignsData={allCampaigns} />
      </div>
      {/* <div className={styles.descriptionDiv}>
        <h3 className={styles.title}>내가 본 캠페인</h3>
        <div
          onClick={() => router.push("/campaigns")}
          className={styles.showAll}
        >
          전체보기
          <Image
            width={20}
            height={20}
            src={icon_chevron_right}
            alt={"icon_chevron_right"}
          />
        </div>
      </div>
      <div className={styles.sawCampaigns}>
        <CampaignCarousel loading={loading} campaignsData={allCampaigns} />
      </div> */}
      <h3 className={styles.title}>크리에이터 랭킹</h3>
      <p className={styles.description}>
        지금 사용자들에게 가장 인기있는 크리에이터
      </p>
      <div className={styles.creatorRanking}>
        <CreatorRanking
          loading={loadingCreators}
          openCreatorDetail={openCreatorDetail}
          selectCategory={selectCategory}
          curCategory={curCategory}
          creatorRankingData={creatorRankingData}
        />
      </div>{" "}
      {isVisCreatorDetail && (
        <CreatorDetail
          channelId={channelId}
          clickModalOutside={clickModalOutside}
        />
      )}
    </main>
  );
}

const CREATOR_RANKING_DATA = [
  {
    ranking: 1,
    name: "누가영Nugayoung",
    followerNum: "1.5k",
  },
  {
    ranking: 2,
    name: "누가영Nugayoung",
    followerNum: "1.5k",
  },
  {
    ranking: 3,
    name: "누가영Nugayoung",
    followerNum: "1.5k",
  },
  {
    ranking: 4,
    name: "누가영Nugayoung",
    followerNum: "1.5k",
  },
  {
    ranking: 5,
    name: "누가영Nugayoung",
    followerNum: "1.5k",
  },
  {
    ranking: 6,
    name: "누가영Nugayoung",
    followerNum: "1.5k",
  },
  {
    ranking: 7,
    name: "누가영Nugayoung",
    followerNum: "1.5k",
  },
  {
    ranking: 8,
    name: "누가영Nugayoung",
    followerNum: "1.5k",
  },
  {
    ranking: 9,
    name: "누가영Nugayoung",
    followerNum: "1.5k",
  },
  {
    ranking: 10,
    name: "누가영Nugayoung",
    followerNum: "1.5k",
  },
];
