import styles from "./MyCampaignsTableItem.module.scss";
import Image from "next/image";
import Button from "../Button";
import classNames from "classnames/bind";

import icon_youtube from "@/app/assets/icons/icon_youtube.png";
import icon_instagram from "@/app/assets/icons/icon_instagram.png";
import icon_tiktok from "@/app/assets/icons/icon_tiktok.png";

const cx = classNames.bind(styles);

interface props {
  campaignData?: any;
  moveToCampaignDetail: (campaignId: number) => void;
  moveToCampaignManage: (event: any, campaignId: number) => void;
}

export default function CreatorsTableItem({
  campaignData,
  moveToCampaignDetail,
  moveToCampaignManage,
}: props) {
  const state = campaignData.is_completed
    ? "progress_complete"
    : campaignData.is_draft
    ? "writing"
    : campaignData.is_recruiting
    ? "recruiting"
    : campaignData.is_recruited
    ? "recruitment_complete"
    : campaignData.is_active
    ? "proceeding"
    : "proceeding";

  return (
    <div
      onClick={() => moveToCampaignDetail(campaignData.id)}
      className={styles.container}
    >
      <div className={styles.state}>
        <span className={cx("stateBadge", state)}>
          {state === "proceeding" && "진행중"}
          {state === "recruitment_complete" && "모집완료"}
          {state === "recruiting" && "모집중"}
          {state === "writing" && "작성중"}
          {state === "progress_complete" && "진행완료"}
        </span>
      </div>
      <div className={styles.title}>
        <span className={styles.dataSpan}>{campaignData?.title}</span>
      </div>
      <div className={styles.platform}>
        <span className={styles.dataSpan}>
          <Image
            width={20}
            height={20}
            src={
              campaignData.platform === "Youtube"
                ? icon_youtube
                : campaignData.platform === "Instagram"
                ? icon_instagram
                : campaignData.platform === "Tiktok"
                ? icon_tiktok
                : icon_youtube
            }
            alt={"icon_platform"}
          />
        </span>
      </div>
      <div className={styles.category}>
        <span className={styles.dataSpan}>{campaignData?.category}</span>
      </div>
      <div className={styles.period}>
        <span className={styles.dataSpan}>
          {campaignData?.start_date + " - " + campaignData?.end_date}
        </span>
      </div>
      <div className={styles.manageButton}>
        <span className={styles.dataSpan}>
          <Button
            onClick={(event: any) =>
              moveToCampaignManage(event, campaignData.id)
            }
            label={"보기"}
            style={"tertiery"}
            size={"xsmall"}
            state={"default"}
          />
        </span>
      </div>
    </div>
  );
}
