import { SetStateAction } from "react";
import styles from "./CreatorRanking.module.scss";
import classNames from "classnames/bind";

import CreatorRankingItem from "./CreatorRankingItem";

const cx = classNames.bind(styles);

interface props {
  curCategory: { value: string; kr: string };
  selectCategory: (category: { value: string; kr: string }) => void;
  creatorRankingData: any;
  openCreatorDetail: any;
}
export default function CreatorRanking({
  curCategory,
  selectCategory,
  creatorRankingData,
  openCreatorDetail,
}: props) {
  return (
    <div>
      <div className={styles.categoryList}>
        {CREATOR_CATEGORY_DATA.map((category, index) => {
          return (
            <div
              onClick={() => selectCategory(category)}
              key={index}
              className={cx(
                "categoryItem",
                curCategory.value === category.value ? "selected" : "unselected"
              )}
            >
              {category.kr}
            </div>
          );
        })}
      </div>
      <div className={styles.rankingList}>
        {creatorRankingData.map((creator: any, index: number) => {
          return (
            <CreatorRankingItem
              openCreatorDetail={openCreatorDetail}
              index={index}
              key={index}
              creatorData={creator}
            />
          );
        })}
      </div>
    </div>
  );
}

const CREATOR_CATEGORY_DATA = [
  { value: "all", kr: "전체" },
  { value: "beauty", kr: "뷰티" },
  { value: "fashion", kr: "패션" },
  { value: "food", kr: "푸드" },
];
