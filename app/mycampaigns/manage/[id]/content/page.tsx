"use client";
import { useState, useCallback, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { toastState } from "@/app/recoil/user";

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

export default function ContentManage() {
  const [requestedContentArr, setRequestedContentArr] = useState<any>([]);
  const [approvedContentArr, setApprovedContentArr] = useState<any>([]);
  const [declinedContentArr, setDeclinedContentArr] = useState<any>([]);
  const [selectedContentArr, setSelectedContentArr] = useState<any[]>([]);
  const [toast, setToast] = useRecoilState(toastState);
  const toastRef = useRef<any>();

  const [allSelected, setAllSelected] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    async function getInitialData() {
      const initialData = await REQUESTED_CONTENTS_DATA.map((item) => {
        return {
          ...item,
          selected: false,
        };
      });
      setRequestedContentArr(initialData);
    }
    getInitialData();
    setLoading(false);
  }, []);

  const clickCheckbox = useCallback(
    (index?: number) => {
      let tmpArr = [...requestedContentArr];
      tmpArr[index ? index : 0].selected = !tmpArr[index ? index : 0].selected;

      setSelectedContentArr((prev) => {
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

      setRequestedContentArr(tmpArr);
    },
    [requestedContentArr]
  );

  const clickAllCheckbox = useCallback(() => {
    let tmpArr = [...requestedContentArr];
    if (allSelected) {
      setAllSelected(false);
      const unSelectedArr = tmpArr.map((item) => {
        return {
          ...item,
          selected: false,
        };
      });

      setRequestedContentArr(unSelectedArr);
      setSelectedContentArr([]);
    } else {
      setAllSelected(true);
      const selectedArr = tmpArr.map((item) => {
        return {
          ...item,
          selected: true,
        };
      });
      setRequestedContentArr(selectedArr);
      setSelectedContentArr(requestedContentArr.map((item: any) => item));
    }
  }, [requestedContentArr, allSelected]);

  const clickSetContentsState = (state: string) => {
    const tmpSelectedContentArr = [...selectedContentArr];

    setAllSelected(false);
    setSelectedContentArr([]);
    setRequestedContentArr((prev: any) =>
      prev.filter((item: any) => {
        return item.selected === false;
      })
    );

    if (state === "approve") {
      const tmpContentArr = tmpSelectedContentArr.map((item) => {
        delete item.selected;
        return {
          ...item,
          state: "completed_approval",
        };
      });

      setApprovedContentArr((prev: any) => prev.concat(tmpContentArr));
    }
    if (state === "decline") {
      const tmpContentArr = tmpSelectedContentArr.map((item) => {
        delete item.selected;
        return {
          ...item,
          state: "rejected_approval",
        };
      });
      setDeclinedContentArr((prev: any) => prev.concat(tmpContentArr));
    }
  };

  const copyText = (text: string) => {
    window.navigator.clipboard.writeText(text);
    if (!toast.visible) {
      setToast({
        visible: true,
        message: "복사 되었습니다.",
        type: "confirm",
        request: "content",
      });
      toastRef.current.show();
    }
  };

  return (
    <Container>
      <ListTable
        loading={loading}
        marginTop={48}
        tableMarginTop={8}
        title={"대기중인 콘텐츠"}
        headerColumns={CONTENT_REQUEST_TABLE_HEADER}
        data={requestedContentArr}
        clickCheckbox={clickCheckbox}
        clickAllCheckbox={clickAllCheckbox}
        allSelected={allSelected}
        emptyTitle={"아직 업로드 예정인 콘텐츠가 없습니다."}
        emptyDescrip={"크리에이터 참가가 확정되면 목록에 나타납니다."}
        copyText={copyText}
      />
      <RequestTableFooter>
        <Button
          onClick={() => clickSetContentsState("decline")}
          label={"승인거부"}
          style={"tertiery"}
          size={"small"}
          state={"default"}
        />
        <Button
          onClick={() => clickSetContentsState("approve")}
          label={"승인"}
          style={"primary"}
          size={"small"}
          state={"default"}
        />
      </RequestTableFooter>
      <ListTable
        marginTop={56}
        tableMarginTop={8}
        title={"승인이 완료된 콘텐츠"}
        headerColumns={CONTENT_TABLE_HEADER}
        data={approvedContentArr}
        emptyTitle={"아직 업로드 예정인 콘텐츠가 없습니다."}
        emptyDescrip={"크리에이터 참가가 확정되면 목록에 나타납니다."}
        copyText={copyText}
      />
      <ListTable
        marginTop={48}
        tableMarginTop={8}
        title={"승인이 거부된 콘텐츠"}
        headerColumns={CONTENT_TABLE_HEADER}
        data={declinedContentArr}
        emptyTitle={"아직 업로드 예정인 콘텐츠가 없습니다."}
        emptyDescrip={"크리에이터 참가가 확정되면 목록에 나타납니다."}
        copyText={copyText}
      />
      <Toast ref={toastRef} />
    </Container>
  );
}

const CONTENT_REQUEST_TABLE_HEADER = [
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
    label: "콘텐츠 링크",
    width: "66.66",
  },
];

const REQUESTED_CONTENTS_DATA = [
  {
    selected: false,
    state: "waiting_for_approval",
    name: "jeffreestar",
    content_url:
      "https://www.youtube.com/watch?v=jOTfBlKSQYY&list=PL4fGSI1pDJn5S09aId3dUGp40ygUqmPGc",
  },
  {
    selected: false,
    state: "waiting_for_approval",
    name: "jeffreestar",
    content_url:
      "https://www.youtube.com/watch?v=jOTfBlKSQYY&list=PL4fGSI1pDJn5S09aId3dUGp40ygUqmPGc",
  },
  {
    selected: false,
    state: "waiting_for_approval",
    name: "Makeup By Nikki La Rose",
    content_url:
      "https://www.youtube.com/watch?v=jOTfBlKSQYY&list=PL4fGSI1pDJn5S09aId3dUGp40ygUqmPGc",
  },
  {
    selected: false,
    state: "waiting_for_approval",
    name: "Hindash",
    content_url:
      "https://www.youtube.com/watch?v=jOTfBlKSQYY&list=PL4fGSI1pDJn5S09aId3dUGp40ygUqmPGc",
  },
  {
    selected: false,
    state: "waiting_for_approval",
    name: "TANIELLE JAI",
    content_url:
      "https://www.youtube.com/watch?v=jOTfBlKSQYY&list=PL4fGSI1pDJn5S09aId3dUGp40ygUqmPGc",
  },
];

const CONTENT_TABLE_HEADER = [
  {
    label: "상태",
    width: "8.32",
  },
  {
    label: "크리에이터",
    width: "20.83",
  },
  {
    label: "콘텐츠 링크",
    width: "66.66",
  },
];

const CONFIRMED_CONTENT_TABLE_DATA = [
  {
    state: "completed_approval",
    name: "Creator Name",
    content_url: "https://www.youtube.com/watch?v=c0-xisl-Nes",
  },
  {
    state: "completed_approval",
    name: "Creator Name",
    content_url: "https://www.youtube.com/watch?v=HO0AyUK-ASM",
  },
  {
    state: "completed_approval",
    name: "Creator Name",
    content_url: "https://www.youtube.com/",
  },
  {
    state: "completed_approval",
    name: "Creator Name",
    content_url: "https://www.youtube.com/",
  },
  {
    state: "completed_approval",
    name: "Creator Name",
    content_url: "https://www.youtube.com/",
  },
];

const REJECTED_CONTENT_TABLE_DATA = [
  {
    state: "rejected_approval",
    name: "Creator Name",
    content_url: "https://www.youtube.com/",
  },
  {
    state: "rejected_approval",
    name: "Creator Name",
    content_url: "https://www.youtube.com/",
  },
  {
    state: "rejected_approval",
    name: "Creator Name",
    content_url: "https://www.youtube.com/",
  },
  {
    state: "rejected_approval",
    name: "Creator Name",
    content_url: "https://www.youtube.com/",
  },
  {
    state: "rejected_approval",
    name: "Creator Name",
    content_url: "https://www.youtube.com/",
  },
];
