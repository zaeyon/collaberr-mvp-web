import Image from "next/image";
import styles from "./CampaignDetail.module.scss";
import { ColorRing } from "react-loader-spinner";

import thumbnail from "../assets/campaign_thumbnail.jpeg";
import icon_clip from "../assets/icons/icon_clip.png";
import icon_eye from "../assets/icons/icon_eye.png";
import icon_bookmark from "../assets/icons/icon_bookmark.png";
import icon_bookmark_red from "../assets/icons/icon_bookmark_red.png";
import icon_bookmark_red_fill from "../assets/icons/icon_bookmark_red-fill.png";

import CampaignDetailIconItem from "./CampaignDetailIconItem";

interface props {
  loading?: boolean;
  type: string;
  brandName: string;
  title: string;
  thumbnailImageSrc: any;
  platform: string;
  category: string;
  shownStartDate: string;
  shownEndDate: string;
  description: string;
  missionType: string;
  bid: number | undefined;
  files: any;
  isBookmark?: boolean;
  clickBookmark?: () => void;
}

export default function CampaignDetail({
  loading,
  type,
  brandName = "Brand Name",
  title,
  category,
  thumbnailImageSrc = "",
  platform,
  shownStartDate,
  shownEndDate,
  description,
  missionType,
  bid,
  files,
  isBookmark,
  clickBookmark,
}: props) {
  return (
    <div
      style={type === "create" ? { width: "auto" } : { width: 700 }}
      className={styles.mainInfoContainer}
    >
      <div
        style={
          type === "create"
            ? { width: "auto", height: 400 }
            : { width: "100%", height: 400 }
        }
        className={styles.thumbnailImageDiv}
      >
        {thumbnailImageSrc !== "" && (
          <Image
            fill={true}
            className={styles.thumbnailImage}
            src={thumbnailImageSrc}
            alt={"campaign_thumbnail"}
          />
        )}
      </div>
      {!loading && (
        <div>
          <div className={styles.head}>
            <div className={styles.brandName}>
              {brandName ? brandName : "Brand Name"}
              {/* {type === "detail" && (
            <p
              onClick={() => (clickBookmark ? clickBookmark() : "")}
              className={styles.bookmark}
            >
              <Image
                style={{
                  marginRight: 4,
                }}
                width={24}
                height={24}
                src={isBookmark ? icon_bookmark_red_fill : icon_bookmark_red}
                alt={"icon_bookmark_red"}
              />
              {isBookmark ? "북마크됨" : "북마크하기"}
            </p>
          )} */}
            </div>
            <div className={styles.title}>
              {title ? title : "Campaign Name"}
            </div>
            <div className={styles.subItemList}>
              <div className={styles.subItem}>
                {category !== "default" ? category : "Category"}
              </div>
              <div className={styles.subItem}>
                {platform ? platform : "Platform"}
              </div>
              <div className={styles.subItem}>
                {missionType !== "default" ? missionType : "Mission Type"}
              </div>
            </div>
          </div>
          <div className={styles.label}>Campaign Information</div>
          <pre className={styles.description}>
            {description ? description : "Campaign description"}
          </pre>
          <div className={styles.label}>Mission</div>
          <CampaignDetailIconItem
            platform={platform}
            value={missionType !== "default" ? missionType : ""}
            type={"mission"}
          />
          <div className={styles.label}>Rewards</div>
          <CampaignDetailIconItem
            value={"$ " + bid?.toLocaleString()}
            type={"rewards"}
          />
          {/* <div className={styles.label}>Files</div>
          {/* <div className={styles.fileItemContainer}>
            <Image width={24} height={24} alt={"icon_clip"} src={icon_clip} />
            <span className={styles.filePath}>{""}</span>
          </div> */}
        </div>
      )}
      {loading && (
        <div className={styles.loaderDiv}>
          <ColorRing
            visible={true}
            height="43"
            width="43"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#F25476", "#F25476", "#F25476", "#F25476", "#F25476"]}
          />
        </div>
      )}
      {/* {type === "detail" && (
          <div className={styles.indicatorItemList}>
            <div className={styles.indicatorItem}>
              <Image alt={"icon_eye"} src={icon_eye} width={20} height={20} />
              {(9999).toLocaleString()}
            </div>
            <div className={styles.indicatorItem}>
              <Image
                alt={"icon_bookmark"}
                src={icon_bookmark}
                width={20}
                height={20}
              />
              {(1234).toLocaleString()}
            </div>
          </div>
        )} */}
    </div>
  );
}

{
  /* <div style={{ marginTop: 16 }} className={styles.subItem}>
<div style={{ width: 92 }} className={styles.subLabel}>
  Date
</div>
<div className={styles.subValue}>
  {shownStartDate && <span>{shownStartDate + " ~ "}</span>}
  {shownEndDate && <span>{shownEndDate}</span>}
</div>
</div>
<div style={{ marginTop: 10 }} className={styles.subItem}>
<div style={{ width: 92 }} className={styles.subLabel}>
  Category
</div>
<div className={styles.subValue}>
  {category !== "default" ? category : ""}
</div>
</div>
<div style={{ marginTop: 10 }} className={styles.subItem}>
<div style={{ width: 92 }} className={styles.subLabel}>
  Platform
</div>
<div className={styles.subValue}>{platform}</div>
</div> */
}
