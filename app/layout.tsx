"use client";

import { useState, useEffect } from "react";
import { RecoilRoot, useRecoilState } from "recoil";
import "./globals.css";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

import { userState, isVisDropdownState } from "./recoil/user";
import TopBar from "./components/TopBar";
import SideBar from "./components/SideBar";
import Frame from "./components/Frame";
import { POST_refreshToken } from "./api/auth";

const DynamicFrame = dynamic(() => import("./components/Frame"), {
  ssr: false,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isVisSideBar, setIsVisSideBar] = useState(true);

  const onClickHamburger = () => {
    setIsVisSideBar(!isVisSideBar);
  };

  return (
    <html lang="en">
      <RecoilRoot>
        <body>
          <Frame>{children}</Frame>
        </body>
      </RecoilRoot>
    </html>
  );
}
