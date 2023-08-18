import styles from "./JoinCampaign.module.scss";
import { useRecoilValue } from "recoil";
import { userState } from "../recoil/user";
import { campaignType } from "@/app/type/campaign";

import { getDday } from "../lib/date";
import Button from "./Button";

interface props {
  loading: boolean;
  campaignItem: any;
  clickJoinCampaign: () => void;
}

export default function JoinCampaign({
  loading,
  campaignItem,
  clickJoinCampaign,
}: props) {
  const user = useRecoilValue(userState);
  return (
    <div className={styles.joinContainer}>
      <div className={styles.summaryInfoContainer}>
        <div className={styles.title}>{"모집정보"}</div>
        <div style={{ marginTop: 24 }} className={styles.subItem}>
          <div className={styles.subLabel}>광고비</div>
          <div className={styles.subValue}>
            {!loading ? "$" + campaignItem.reward?.toLocaleString() : " "}
          </div>
        </div>
        <div className={styles.subItem}>
          <div className={styles.subLabel}>모집 마감일</div>
          <div className={styles.subValue}>
            {!loading ? campaignItem.recruit_end_date : ""}
            {!loading && (
              <span className={styles.addInfo}>
                {new Date() > new Date(campaignItem.recruit_end_date)
                  ? "모집 마감"
                  : `D-${getDday(campaignItem.recruit_end_date)}`}
              </span>
            )}
          </div>
        </div>
        <div className={styles.subItem}>
          <div className={styles.subLabel}>모집현황</div>
          <div className={styles.subValue}>
            {!loading
              ? campaignItem.approved_creators
                ? campaignItem.approved_creators.length + "명"
                : "0명"
              : ""}
            <span className={styles.addInfo}>{""}</span>
          </div>
        </div>
      </div>
      <div className={styles.joinButton}>
        <Button
          label={"Join Campaign"}
          size={"large"}
          state={user.role === "CREATOR" ? "default" : "disabled"}
          style={"primary"}
          onClick={clickJoinCampaign}
        />
      </div>
    </div>
  );
}
