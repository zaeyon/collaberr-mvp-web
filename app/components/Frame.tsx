import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { isVisSidebarState, userState, toastState } from "../recoil/user";
import { usePathname, useRouter } from "next/navigation";

import { detectMobile } from "../lib/detectMobile";
import { POST_refreshToken } from "../api/auth";
import TopBar from "./TopBar";
import SideBar from "./SideBar";

export default function Frame({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useRecoilState(userState);
  const [isVisSidebar, setIsVisSidebar] = useRecoilState(isVisSidebarState);
  const [toast, setToast] = useRecoilState(toastState);
  const pathname = usePathname();
  const router = useRouter();

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
    <body
      style={
        detectMobile()
          ? {}
          : isVisSidebar
          ? { paddingLeft: 240 }
          : { paddingLeft: 0 }
      }
    >
      <TopBar />
      {isVisSidebar && <SideBar />}
      {children}
    </body>
  );
}
