"use client";
import { useEffect, useRef, useState } from "react";
import { headers } from "next/headers";
import { useRouter } from "next/navigation";
import styles from "./page.module.scss";
import { useRecoilState } from "recoil";

import { baseUrl } from "../api";
import MyCampaignList from "../components/MyCampaignList";
import { GET_showMyCampaigns } from "../api/campaign";
import { myCampaignsState } from "../recoil/campaign";
import Toast from "../components/Toast";
import { toastState } from "../recoil/user";

export default function MyCampaigns() {
  const [myCampaigns, setMyCampaigns] = useRecoilState(myCampaignsState);
  const [toast, setToast] = useRecoilState(toastState);
  const [loading, setLoading] = useState(myCampaigns.length > 0 ? false : true);
  const toastRef = useRef<any>();
  const router = useRouter();

  useEffect(() => {
    if (toast.visible && toast.request === "/mycampaigns/create") {
      toastRef.current?.show();
    }
  }, [toast]);

  useEffect(() => {
    GET_showMyCampaigns()
      .then((res) => {
        console.log("GET_showMyCampaigns success", res);
        setMyCampaigns(res.reverse());
        setLoading(false);
      })
      .catch((err) => {
        console.log("GET_showMyCampaign err", err);
        setLoading(false);
      });
  }, []);

  const moveToCampaignDetail = (campaignId: number) => {
    router.push(`/campaigns/${campaignId}`);
  };

  const moveToCampaignManage = (event: any, campaignId: number) => {
    console.log("moveToCampaignManage", campaignId);
    event.stopPropagation();

    router.push(`/mycampaigns/manage/${campaignId}/recruit`);
  };

  return (
    <main>
      <h1>My Campaigns</h1>
      <div className={styles.description}>Manage your campaigns.</div>
      <MyCampaignList
        loading={loading}
        moveToCampaignDetail={moveToCampaignDetail}
        moveToCampaignManage={moveToCampaignManage}
      />
      <Toast ref={toastRef} />
    </main>
  );
}

const MY_CAMPAIGNS_DATA = [
  {
    id: 1,
    state: "published",
    title: "This is the title for the campaign 1",
    platform: "instagram",
    type: "-",
    date: "2023-00-00 ~ 2023-00-00",
  },
  {
    id: 2,
    state: "published",
    title: "This is the title for the campaign 2",
    platform: "youtube",
    type: "-",
    date: "2023-00-00 ~ 2023-00-00",
  },
  {
    id: 3,
    state: "published",
    title: "This is the title for the campaign 3",
    platform: "youtube",
    type: "-",
    date: "2023-00-00 ~ 2023-00-00",
  },
  {
    id: 4,
    state: "editing",
    title: "This is the title for the campaign 4",
    platform: "tiktok",
    type: "-",
    date: "2023-00-00 ~ 2023-00-00",
  },
  {
    id: 5,
    state: "cancelled",
    title: "This is the title for the campaign 5",
    platform: "instagram",
    type: "-",
    date: "2023-00-00 ~ 2023-00-00",
  },
  {
    id: 6,
    state: "finished",
    title: "This is the title for the campaign 6",
    platform: "instagram",
    type: "-",
    date: "2023-00-00 ~ 2023-00-00",
  },
];
