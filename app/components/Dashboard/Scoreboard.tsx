import styles from "./Scoreboard.module.scss";

import Tooltip from "../Tooltip";

interface props {
  loading?: boolean;
  data: any[];
  marginTop?: number;
  gap?: number;
}

export default function Scoreboard({
  data,
  marginTop = 0,
  gap = 20,
  loading,
}: props) {
  return (
    <div
      style={{ marginTop: marginTop, gap: gap }}
      className={styles.container}
    >
      {data.map((item, index) => {
        return (
          <div key={index} className={styles.scoreboardItem}>
            <div className={styles.label}>
              {item.label}
              {item.description && (
                <Tooltip
                  iconType={"info"}
                  description={item.description}
                  tooltipWidth={item.tooltipWidth}
                />
              )}
            </div>
            <div className={styles.value}>
              {!loading && item.value ? item.value : "-"}
            </div>
            {item.change && (
              <div
                style={{
                  color: item.change === "increase" ? "#3AB09E" : "#3183F6",
                }}
                className={styles.change}
              >
                {item.changeDescription}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
