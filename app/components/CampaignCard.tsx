"use client";

import styles from "./CampaignCard.module.scss";
import { motion, MotionConfig } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import classNames from "classnames/bind";

import icon_facebook from "../assets/icons/icon_facebook.png";
import icon_instagram from "../assets/icons/icon_instagram.png";
import icon_tiktok from "../assets/icons/icon_tiktok.png";
import icon_youtube from "../assets/icons/icon_youtube.png";
import icon_bookmark_fill from "../assets/icons/icon_bookmark-fill.png";

const cx = classNames.bind(styles);

interface props {
  type: string;
  campaign: any;
}

export default function CampaignCard({ type, campaign }: props) {
  const thumbnailAni = {
    initial: { boxShadow: "0px 0px 0px 0px" },
    animate: {
      boxShadow: "0px 8px 16px 0px #242D351A",
      transform: "translateY(-5px)",
    },
  };

  const titleAni = {
    initial: { color: "#242D35" },
    animate: { color: "#F25476" },
  };

  const platformIcon: any = {
    Instagram: icon_instagram,
    Youtube: icon_youtube,
    Tiktok: icon_tiktok,
  };

  return (
    <MotionConfig transition={{ duration: 0.25, type: "ease-in-out" }}>
      <motion.div initial="initial" animate="initial" whileHover="animate">
        <Link href={`/campaigns/${campaign.id}`} className={styles.container}>
          <motion.div
            className={cx("thumbnailDiv", type)}
            variants={thumbnailAni}
          >
            {campaign.thumbnail && (
              <Image
                width={309}
                height={180}
                alt={"campaign_thumbnail"}
                src={campaign.thumbnail}
                className={styles.thumbnail}
              />
            )}
            <Image
              width={24}
              height={24}
              alt={"icon_platform"}
              src={platformIcon[campaign.platform]}
              className={styles.platformIcon}
            />
            {/* <Image
              width={24}
              height={24}
              alt={"icon_bookmark"}
              src={icon_bookmark_fill}
              className={styles.bookmarkIcon}
            /> */}
          </motion.div>
          <div
            className={styles.brandName}
          >{`${campaign.brand_name} • ${campaign.category}`}</div>
          <motion.div variants={titleAni} className={styles.title}>
            {campaign.title}
          </motion.div>
          {/* <div className={styles.viewCount}>{campaign.category}</div> */}
        </Link>
      </motion.div>
    </MotionConfig>
  );
}
