import styles from "./CategoryLinkItem.module.scss";
import Link from "next/link";

import { useRecoilState } from "recoil";
import { isVisSidebarState } from "../recoil/user";
import { usePathname } from "next/navigation";
import { detectMobile } from "../lib/detectMobile";

interface props {
  label: string;
  href: string;
}

export default function CategoryLinkItem({ label, href }: props) {
  const pathname = usePathname();
  const [isVisSideBar, setIsVisSideBar] = useRecoilState(isVisSidebarState);

  const onClickCategory = () => {
    if (detectMobile()) {
      setIsVisSideBar(false);
    }
  };
  return (
    <Link
      onClick={() => onClickCategory()}
      style={{
        color: "/" + pathname.split("/")[1] === href ? "#F25476" : "#445462",
      }}
      className={styles.container}
      href={href}
    >
      {label}
    </Link>
  );
}
