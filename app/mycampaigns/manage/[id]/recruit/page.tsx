"use client";
import { useState, useCallback, useEffect } from "react";
import styled from "@emotion/styled";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { getDday } from "@/app/lib/date";

import {
  GET_showCreatorForCampaign,
  PUT_setCreatorsState,
} from "@/app/api/campaign";

import ManageTab from "@/app/components/Manage/ManageTab";
import Scoreboard from "@/app/components/Dashboard/Scoreboard";
import ListTable from "@/app/components/ListTable";
import Button from "@/app/components/Button";
import Toast from "@/app/components/Toast";

const Container = styled.div``;

const RequestTableFooter = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 8px;
`;

export default function RecruitManage() {
  const [requestedCreatorArr, setRequestedCreatorArr] = useState<any>([]);
  const [approvedCreatorArr, setApprovedCreatorArr] = useState<any>([]);
  const [declinedCreatorArr, setDeclinedCreatorArr] = useState<any>([]);
  const [selectedCreatorArr, setSelectedCreatorArr] = useState<any[]>([]);
  const [allSelected, setAllSelected] = useState(false);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const params = useParams();

  const SCOREBOARD_DATA = [
    {
      label: "모집 정원",
      value: "10명",
    },
    {
      label: "모집된 참가자",
      value: `${approvedCreatorArr.length}명`,
    },
    {
      label: "예상 지출금액",
      value: "$1,000",
    },
    {
      label: "모집 마감까지",
      value: "D-10",
    },
  ];

  useEffect(() => {
    setLoading(true);
    async function getInitialData() {
      const initialData = await REQUESTED_CREATORS_DATA.map((item) => {
        return {
          ...item,
          selected: false,
        };
      });
      setRequestedCreatorArr(initialData);
    }
    getInitialData();
    setLoading(false);
  }, []);

  // useEffect(() => {
  //   console.log("RecruitManage params", params);
  //   GET_showCreatorForCampaign(Number(params.id))
  //     .then((res) => {
  //       console.log("GET_showCreatorForCampaign res", res);
  //       setRequestedCreatorArr(
  //         res.data.requested.map((item: any) => {
  //           return {
  //             selected: false,
  //             state: "request_recruit",
  //             ...item,
  //           };
  //         })
  //       );
  //       setApprovedCreatorArr(
  //         res.data.approved.map((item: any) => {
  //           return {
  //             state: "approve_recruit",
  //             ...item,
  //           };
  //         })
  //       );
  //       setDeclinedCreatorArr(
  //         res.data.declined.map((item: any) => {
  //           return {
  //             state: "decline_recruit",
  //             ...item,
  //           };
  //         })
  //       );
  //     })
  //     .catch((err) => {
  //       console.log("GET_showCreatorForCampaign err", err);
  //     });
  // }, []);

  const clickCheckbox = useCallback(
    (index?: number) => {
      let tmpArr = [...requestedCreatorArr];
      tmpArr[index ? index : 0].selected = !tmpArr[index ? index : 0].selected;

      setSelectedCreatorArr((prev) => {
        if (!prev.includes(tmpArr[index ? index : 0])) {
          return [...prev, tmpArr[index ? index : 0]];
        } else {
          const removeIndex = prev.findIndex(
            (item: any) => item === tmpArr[index ? index : 0]
          );

          prev.splice(removeIndex, 1);

          return prev;
        }
      });

      setRequestedCreatorArr(tmpArr);
    },
    [requestedCreatorArr]
  );

  const clickAllCheckbox = useCallback(() => {
    let tmpArr = [...requestedCreatorArr];
    if (allSelected) {
      setAllSelected(false);
      const unSelectedArr = tmpArr.map((item) => {
        return {
          ...item,
          selected: false,
        };
      });

      setRequestedCreatorArr(unSelectedArr);
      setSelectedCreatorArr([]);
    } else {
      setAllSelected(true);
      const selectedArr = tmpArr.map((item) => {
        return {
          ...item,
          selected: true,
        };
      });
      setRequestedCreatorArr(selectedArr);
      setSelectedCreatorArr(requestedCreatorArr.map((item: any) => item));
    }
  }, [requestedCreatorArr, allSelected]);

  const clickSetCreatorsState = (state: string) => {
    const selectedCreatorIdArr = selectedCreatorArr.map((item) => item.id);
    const tmpSelectedCreatorArr = [...selectedCreatorArr];

    setAllSelected(false);
    setSelectedCreatorArr([]);
    setRequestedCreatorArr((prev: any) =>
      prev.filter((item: any) => {
        return item.selected === false;
      })
    );

    if (state === "approve") {
      const tmpCreatorArr = tmpSelectedCreatorArr.map((item) => {
        delete item.selected;
        return {
          ...item,
          state: "approve_recruit",
        };
      });

      setApprovedCreatorArr((prev: any) => prev.concat(tmpCreatorArr));
    }
    if (state === "decline") {
      const tmpCreatorArr = tmpSelectedCreatorArr.map((item) => {
        delete item.selected;
        return {
          ...item,
          state: "decline_recruit",
        };
      });
      setDeclinedCreatorArr((prev: any) => prev.concat(tmpCreatorArr));
    }

    // PUT_setCreatorsState(params.id, selectedCreatorIdArr, state)
    //   .then((res) => {
    //     console.log("PUT_setCreatorsState res", res);
    //   })
    //   .catch((err) => {
    //     console.log("PUT_setCreatorsState err", err);
    //   });
  };

  return (
    <Container>
      <Scoreboard marginTop={24} data={SCOREBOARD_DATA} />
      <ListTable
        loading={loading}
        marginTop={64}
        tableMarginTop={8}
        title={"캠페인 참여요청"}
        headerColumns={CAMPAIGN_JOIN_REQUEST_TABLE_HEADER}
        data={requestedCreatorArr}
        clickCheckbox={clickCheckbox}
        clickAllCheckbox={clickAllCheckbox}
        allSelected={allSelected}
        emptyTitle={"아직 참가를 신청한 크리에이터가 없습니다."}
      />
      <RequestTableFooter>
        <Button
          onClick={() => clickSetCreatorsState("decline")}
          label={"참여 거절"}
          style={"tertiery"}
          size={"small"}
          state={selectedCreatorArr.length > 0 ? "default" : "disabled"}
        />
        <Button
          onClick={() => clickSetCreatorsState("approve")}
          label={"참여 확정"}
          style={"primary"}
          size={"small"}
          state={selectedCreatorArr.length > 0 ? "default" : "disabled"}
        />
      </RequestTableFooter>
      <ListTable
        marginTop={72}
        tableMarginTop={8}
        title={"모집된 크리에이터"}
        headerColumns={CREATOR_TABLE_HEADER}
        data={approvedCreatorArr}
        emptyTitle={"모집된 크리에이터가 없습니다."}
      />
      <ListTable
        marginTop={64}
        tableMarginTop={8}
        title={"거절된 크리에이터"}
        headerColumns={CREATOR_TABLE_HEADER}
        data={declinedCreatorArr}
        emptyTitle={"거절된 크리에이터가 없습니다."}
      />
      <Toast />
    </Container>
  );
}

const CAMPAIGN_JOIN_REQUEST_TABLE_HEADER = [
  {
    label: "selected",
    width: "4.16",
  },
  {
    label: "상태",
    width: "8.32",
  },
  {
    label: "크리에이터",
    width: "20.83",
  },
  {
    label: "구독자 수",
    width: "15.62",
  },
  {
    label: "평균 댓글 수",
    width: "15.62",
  },
  {
    label: "평균 좋아요 수",
    width: "15.62",
  },
  {
    label: "30일 내 업로드",
    width: "15.62",
  },
  {
    label: "채널",
    width: "4.16",
  },
];

const REQUESTED_CREATORS_DATA = [
  {
    selected: false,
    state: "request_recruit",
    name: "jeffreestar",
    subscribers_num: 15900000,
    aver_comment_num: 46500,
    aver_like_num: 126400,
    recent_upload: 11,
    url: "https://www.youtube.com/@jeffreestar",
  },
  {
    selected: false,
    state: "request_recruit",
    name: "Tati",
    subscribers_num: 8360000,
    aver_comment_num: 1700,
    aver_like_num: 30200,
    recent_upload: 20,
    url: "https://www.youtube.com/@Tati",
  },
  {
    selected: false,
    state: "request_recruit",
    name: "Laura Lee",
    subscribers_num: 4610000,
    aver_comment_num: 600,
    aver_like_num: 2300,
    recent_upload: 31,
    url: "https://www.youtube.com/@laura88lee",
  },
  {
    selected: false,
    state: "request_recruit",
    name: "KatieAngel",
    subscribers_num: 18000000,
    aver_comment_num: 3521,
    aver_like_num: 250021,
    recent_upload: 25,
    url: "https://www.youtube.com/@KatieAngelTV_",
  },
  {
    selected: false,
    state: "request_recruit",
    name: "Roman Sharf",
    subscribers_num: 372000,
    aver_comment_num: 2452,
    aver_like_num: 10012,
    recent_upload: 38,
    url: "https://www.youtube.com/@RomanSharf",
  },
  {
    selected: false,
    state: "request_recruit",
    name: "JOON",
    subscribers_num: 6030000,
    aver_comment_num: 62010,
    aver_like_num: 25012,
    recent_upload: 31,
    url: "https://www.youtube.com/@joongadgets",
  },
];

const CREATOR_TABLE_HEADER = [
  {
    label: "상태",
    width: "8.32",
  },
  {
    label: "크리에이터",
    width: "20.83",
  },
  {
    label: "구독자 수",
    width: "16.66",
  },
  {
    label: "평균 댓글 수",
    width: "16.66",
  },
  {
    label: "평균 좋아요 수",
    width: "16.66",
  },
  {
    label: "30일 내 업로드",
    width: "16.66",
  },
  {
    label: "채널",
    width: "4.16",
  },
];
