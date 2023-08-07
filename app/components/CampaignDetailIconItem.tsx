import styles from "./CampaignDetailIconItem.module.scss";
import Image from "next/image";

import icon_bid from "../assets/icons/icon_bid.png";

import icon_youtube from "../assets/icons/icon_youtube.png";
import icon_instagram from "../assets/icons/icon_instagram.png";
import icon_tiktok from "../assets/icons/icon_tiktok.png";

interface props {
  platform?: string;
  type: string;
  value: string | number | undefined;
}

export default function CampaignDetailIconItem({
  type,
  value,
  platform,
}: props) {
  return (
    <div className={styles.container}>
      <Image
        width={24}
        height={24}
        src={
          type === "rewards"
            ? icon_bid
            : type === "mission"
            ? platform === "Youtube"
              ? icon_youtube
              : platform === "Instagram"
              ? icon_instagram
              : platform === "Tiktok"
              ? icon_tiktok
              : icon_youtube
            : ""
        }
        alt={"icon_type"}
      />
      <div className={styles.value}>{value}</div>
    </div>
  );
}
