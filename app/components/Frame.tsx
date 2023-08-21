import { useEffect, useLayoutEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { isVisSidebarState, userState, toastState } from "../recoil/user";
import { usePathname, useRouter } from "next/navigation";
import { isBrowser, isMobile } from "react-device-detect";
import dynamic from "next/dynamic";
import { Device } from "@/app/components/Device";

import { detectMobile } from "../lib/detectMobile";
import { POST_refreshToken } from "../api/auth";
import TopBar from "./TopBar";
import SideBar from "./SideBar";

const DynamicSideBar = dynamic(() => import("./SideBar"), {
  ssr: false,
});

export default function Frame({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useRecoilState(userState);
  const [isVisSidebar, setIsVisSidebar] = useRecoilState(isVisSidebarState);
  const [toast, setToast] = useRecoilState(toastState);

  useEffect(() => {
    if (user.isLogin) {
      setInterval(() => {
        POST_refreshToken()
          .then((res) => {
            console.log("POST_refreshToken success", res);
          })
          .catch((err) => {
            console.log("POST_refreshToken err", err);
          });
      }, 240000);
    }
  }, [user]);

  return (
    <>
      <Device desktop>
        <body style={isVisSidebar ? { paddingLeft: 240 } : { paddingLeft: 0 }}>
          <TopBar />
          <DynamicSideBar />
          {children}
        </body>
      </Device>
      <Device mobile>
        <body>
          <TopBar />
          <DynamicSideBar />
          {children}
        </body>
      </Device>
    </>
  );
}
