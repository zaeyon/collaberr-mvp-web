import { SetStateAction } from "react";
import styles from "./CreatorRanking.module.scss";
import classNames from "classnames/bind";
import { ColorRing } from "react-loader-spinner";

import CreatorRankingItem from "./CreatorRankingItem";

const cx = classNames.bind(styles);

interface props {
  loading: boolean;
  curCategory: { value: string; kr: string };
  selectCategory: (category: { value: string; kr: string }) => void;
  creatorRankingData: any;
  openCreatorDetail: any;
}
export default function CreatorRanking({
  loading,
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
      {!loading && (
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
      )}
      {loading && (
        <div className={styles.loadingDiv}>
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
    </div>
  );
}

const CREATOR_CATEGORY_DATA = [
  { value: "all", kr: "전체" },
  { value: "beauty", kr: "뷰티" },
  { value: "fashion", kr: "패션" },
  { value: "food", kr: "푸드" },
];
