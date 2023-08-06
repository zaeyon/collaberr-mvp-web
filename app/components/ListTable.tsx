"use client";
import Image from "next/image";
import styled from "@emotion/styled";
import styles from "./ListTable.module.scss";
import Link from "next/link";
import classNames from "classnames/bind";

import Button from "./Button";
import Tooltip from "./Tooltip";
import Checkbox from "./Checkbox";
import EmptyTable from "./EmptyTable";

import icon_youtube from "@/app/assets/icons/icon_youtube.png";
import icon_instagram from "@/app/assets/icons/icon_instagram.png";
import icon_tiktok from "@/app/assets/icons/icon_tiktok.png";
import icon_outlink from "@/app/assets/icons/icon_outlink.png";
import icon_copy from "@/app/assets/icons/icon_copy.png";

const cx = classNames.bind(styles);

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

interface props {
  loading?: boolean;
  title?: string;
  subTitle?: string;
  marginTop?: number;
  tableMarginTop?: number;
  headerColumns: any[];
  data: any[];
  clickCheckbox?: (index?: number) => void;
  clickAllCheckbox?: () => void;
  allSelected?: boolean;
  emptyTitle: string;
  emptyDescrip?: string;
  openCreatorDetail?: () => void;
  renderTableItem?: any;
  renderSkeletonItem?: any;
  moveToCampaignDetail?: (campaignId: number) => void;
}

export default function ListTable({
  loading,
  title,
  subTitle,
  marginTop,
  tableMarginTop,
  headerColumns,
  data,
  clickCheckbox,
  clickAllCheckbox,
  allSelected,
  emptyTitle,
  emptyDescrip,
  openCreatorDetail,
  renderTableItem,
  renderSkeletonItem,
  moveToCampaignDetail,
}: props) {
  const copyText = (text: string) => {
    window.navigator.clipboard.writeText(text);
  };

  return (
    <Container style={{ marginTop: marginTop }}>
      {title && <h3>{title}</h3>}
      {subTitle && <div className={styles.subTitle}>{subTitle}</div>}
      <div style={{ marginTop: tableMarginTop }}>
        <div className={styles.head}>
          {headerColumns.map((item, index) => {
            return (
              <div
                style={{
                  width: item.label === "selected" ? 40 : `${item.width}%`,
                  justifyContent:
                    item.label === "Campaign" ||
                    item.label === "크리에이터" ||
                    item.label === "콘텐츠 링크" ||
                    item.label === "채널명" ||
                    item.label === "캠페인명"
                      ? "flex-start"
                      : "center",
                }}
                className={styles.headerItem}
                key={index}
              >
                {item.label === "selected" && (
                  <Checkbox
                    selected={allSelected}
                    clickCheckbox={clickAllCheckbox}
                  />
                )}
                {item.label !== "selected" && (
                  <>
                    <span className={styles.label}>{item.label}</span>
                    {item.description && (
                      <Tooltip
                        iconType="help"
                        description={item.description}
                        tooltipWidth={item.tooltipWidth}
                      />
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
        {!renderTableItem &&
          data.map((campaign, dataIndex) => {
            const keyValueArr = Object.entries(campaign);
            return (
              <div
                onClick={() =>
                  moveToCampaignDetail
                    ? moveToCampaignDetail(campaign.content)
                    : ""
                }
                className={styles.dataRow}
                key={dataIndex}
              >
                {keyValueArr.map((item: any, index) => {
                  if (item[0] === "name" || item[0] === "title") {
                    return (
                      <div
                        className={styles.dataItem}
                        style={{
                          width: `${headerColumns[index].width}%`,
                        }}
                        key={index}
                      >
                        <span className={styles.dataColumn}>{item[1]}</span>
                      </div>
                    );
                  } else if (item[0] === "content") {
                    return (
                      <div
                        style={{
                          justifyContent: "center",
                          width: `${headerColumns[index].width}%`,
                        }}
                        className={styles.dataItem}
                        key={index}
                      >
                        <span className={styles.dataColumn}>
                          <Link
                            onClick={(event) => event.stopPropagation()}
                            href={`/mycampaigns/manage/${item[1]}/recruit`}
                          >
                            <Button
                              label={"보기"}
                              style={"tertiery"}
                              size={"xsmall"}
                              state={"default"}
                            />
                          </Link>
                        </span>
                      </div>
                    );
                  } else if (item[0] === "approval_button") {
                    return (
                      <div
                        style={{
                          justifyContent: "center",
                          width: `${headerColumns[index].width}%`,
                        }}
                        className={styles.dataItem}
                        key={index}
                      >
                        <span
                          style={{ marginLeft: 5 }}
                          className={styles.dataColumn}
                        >
                          <Link href={`/appliedcampaigns/confirm`}>
                            <Button
                              label={"요청"}
                              style={"tertiery"}
                              size={"xsmall"}
                              state={"default"}
                            />
                          </Link>
                        </span>
                      </div>
                    );
                  } else if (item[0] === "state") {
                    return (
                      <div
                        style={{
                          justifyContent: "center",
                          width: `${headerColumns?.[index]?.width}%`,
                        }}
                        className={styles.dataItem}
                        key={index}
                      >
                        <span className={cx("stateBadge", item[1])}>
                          {item[1] === "proceeding" && "진행중"}
                          {item[1] === "recruitment_complete" && "모집완료"}
                          {item[1] === "recruiting" && "모집중"}
                          {item[1] === "writing" && "작성중"}
                          {item[1] === "progress_complete" && "진행완료"}
                          {item[1] === "request_recruit" && "참여요청"}
                          {item[1] === "approve_recruit" && "참여확정"}
                          {item[1] === "decline_recruit" && "거절됨"}
                          {item[1] === "waiting_for_approval" && "승인대기"}
                          {item[1] === "unregistered" && "미등록"}
                          {item[1] === "completed_approval" && "참여확정"}
                          {item[1] === "rejected_approval" && "거절됨"}
                        </span>
                      </div>
                    );
                  } else if (item[0] === "platform") {
                    return (
                      <div
                        style={{
                          justifyContent: "center",
                          width: `${headerColumns?.[index]?.width}%`,
                        }}
                        className={styles.dataItem}
                        key={index}
                      >
                        <Image
                          width={20}
                          height={20}
                          src={
                            item[1] === "Youtube"
                              ? icon_youtube
                              : item[1] === "Instagram"
                              ? icon_instagram
                              : item[1] === "Tiktok"
                              ? icon_tiktok
                              : icon_youtube
                          }
                          alt={"icon_platform"}
                        />
                      </div>
                    );
                  } else if (item[0] === "selected") {
                    return (
                      <div
                        style={{ justifyContent: "center", width: 40 }}
                        className={styles.dataItem}
                        key={index}
                      >
                        <Checkbox
                          index={dataIndex}
                          clickCheckbox={clickCheckbox}
                          selected={item[1]}
                        />
                      </div>
                    );
                  } else if (item[0] === "url") {
                    return (
                      <div
                        style={{
                          justifyContent: "center",
                          width: `${headerColumns?.[index]?.width}%`,
                        }}
                        className={styles.dataItem}
                        key={index}
                      >
                        <Link target={"_blank"} href={item[1]}>
                          <Image
                            width={20}
                            height={20}
                            alt={"icon_outlink"}
                            src={icon_outlink}
                          />
                        </Link>
                      </div>
                    );
                  } else if (item[0] === "content_url") {
                    return (
                      <div
                        style={{
                          justifyContent: "space-between",
                          width: `${headerColumns?.[index]?.width}%`,
                          alignItems: "center",
                        }}
                        className={cx("dataItem", "link")}
                        key={index}
                      >
                        <Link target={"_blank"} href={item[1]}>
                          {item[1]}
                        </Link>
                        <Image
                          onClick={() => copyText(item[1])}
                          style={{ cursor: "pointer" }}
                          width={20}
                          height={20}
                          alt={"icon_copy"}
                          src={icon_copy}
                        />
                      </div>
                    );
                  } else if (item[0] === "analyze") {
                    return (
                      <div
                        style={{
                          justifyContent: "center",
                          width: `${headerColumns[index].width}%`,
                        }}
                        className={styles.dataItem}
                        key={index}
                      >
                        <span className={styles.dataColumn}>
                          <Button
                            onClick={() =>
                              openCreatorDetail ? openCreatorDetail() : ""
                            }
                            label={"보기"}
                            style={"tertiery"}
                            size={"xsmall"}
                            state={"default"}
                          />
                        </span>
                      </div>
                    );
                  } else {
                    return (
                      <div
                        style={{
                          justifyContent: "center",
                          width: `${headerColumns?.[index]?.width}%`,
                        }}
                        className={styles.dataItem}
                        key={index}
                      >
                        <span className={cx("dataColumn")}>{item[1]}</span>
                      </div>
                    );
                  }
                })}
              </div>
            );
          })}
        {!loading &&
          renderTableItem &&
          data.map((item) => renderTableItem(item))}
        {/* {!loading &&
          renderSkeletonItem &&
          [0, 1, 2, 3, 4].map((item) => renderSkeletonItem(item))} */}
        {!loading && data.length === 0 && (
          <EmptyTable title={emptyTitle} description={emptyDescrip} />
        )}
      </div>
    </Container>
  );
}
