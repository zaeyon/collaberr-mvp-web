"use client";
import { useEffect, useState, useRef } from "react";
import styles from "./page.module.scss";
import Image from "next/image";
import { useRecoilState } from "recoil";

import { toastState } from "@/app/recoil/user";
import { GET_showCampaign } from "@/app/api/campaign";
import { POST_joinCampaign } from "@/app/api/creator";
import CampaignDetail from "@/app/components/CampaignDetail";
import JoinCampaign from "@/app/components/JoinCampaign";
import { campaignType } from "@/app/type/campaign";

import Toast from "@/app/components/Toast";
import ReviewCreatorInfoModal from "@/app/components/ReviewCreatorInfoModal";

export default function Page({ params }: { params: { id: number } }) {
  const [toast, setToast] = useRecoilState(toastState);
  const [isBookmark, setIsBookmark] = useState(false);
  const [isReviewCreatorInfoModal, setIsReviewCreatorInfoModal] =
    useState(false);
  const [loading, setLoading] = useState(true);
  const toastRef = useRef<any>();

  const [campaignItem, setCampaignItem] = useState<campaignType>({
    id: 0,
    brand_name: "",
    title: "",
    thumbnail: "",
    category: "",
    platform: "",
    start_date: "",
    end_date: "",
    recruit_start_date: "",
    recruit_end_date: "",
    description: "",
    mission_type: "",
    reward: 0,
    additional_files: "",
  });

  useEffect(() => {
    setLoading(true);
    GET_showCampaign(params.id)
      .then((res) => {
        console.log("GET_showCampaign success", res);
        setCampaignItem(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("GET_showCampaign fail", err);
        setLoading(false);
      });
  }, []);

  const clickJoinCampaign = () => {
    //setIsReviewCreatorInfoModal(true);
    submitJoinCampaign();
  };

  const submitJoinCampaign = () => {
    if (!toast.visible) {
      setToast({
        visible: true,
        message: "서비스 준비중입니다.",
        type: "warning",
        request: "/campaigns/joincampaign",
      });
      toastRef.current.show();
    }
    // POST_joinCampaign(params.id)
    //   .then((res) => {
    //     console.log("POST_joinCampaign success", res);
    //     if (!toast.visible) {
    //       setToast({
    //         visible: true,
    //         message: "Successfully applied.",
    //         type: "confirm",
    //         request: "/campaigns/joincampaign",
    //       });
    //       toastRef.current.show();
    //       setIsReviewCreatorInfoModal(false);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log("POST_joinCampaign err", err);
    //     if (!toast.visible) {
    //       setToast({
    //         visible: true,
    //         message: "This campaign has already been applied.",
    //         type: "exclamation",
    //         request: "/campaigns/joincampaign",
    //       });
    //       toastRef.current.show();
    //     }
    //   });
  };

  const closeModal = () => {
    setIsReviewCreatorInfoModal(false);
  };

  const clickBookmark = () => {
    setIsBookmark(!isBookmark);
    if (!isBookmark && !toast.visible) {
      setToast({
        visible: true,
        message: "북마크에 저장되었습니다.",
        type: "bookmark",
        request: "/campaigns/bookmark",
      });
      toastRef.current.show();
    }
  };

  return (
    <main className={styles.main}>
      <div style={{ width: "62%" }}>
        <CampaignDetail
          loading={loading}
          isBookmark={isBookmark}
          clickBookmark={clickBookmark}
          type={"detail"}
          category={campaignItem.category}
          brandName={campaignItem.brand_name}
          title={campaignItem.title}
          thumbnailImageSrc={campaignItem.thumbnail}
          platform={campaignItem.platform}
          shownStartDate={campaignItem.start_date}
          shownEndDate={campaignItem.end_date}
          description={campaignItem.description}
          missionType={campaignItem.mission_type}
          bid={campaignItem.reward}
          files={campaignItem.additional_files}
        />
      </div>
      <JoinCampaign
        loading={loading}
        campaignItem={campaignItem}
        clickJoinCampaign={clickJoinCampaign}
      />
      <Toast ref={toastRef} />
      {isReviewCreatorInfoModal && (
        <ReviewCreatorInfoModal
          closeModal={closeModal}
          submitJoinCampaign={submitJoinCampaign}
        />
      )}
    </main>
  );
}
