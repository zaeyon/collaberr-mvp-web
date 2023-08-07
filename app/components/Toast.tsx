import "./Toast.scss";
import { animated, useSpring } from "@react-spring/web";
import { forwardRef, useImperativeHandle } from "react";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { toastState } from "../recoil/user";

import icon_check_circle from "@/app/assets/icons/icon_check-circle.png";
import icon_exclamation from "@/app/assets/icons/icon_exclamation.png";
import icon_warning from "@/app/assets/icons/icon_warning.png";
import icon_bookmark_red_fill from "@/app/assets/icons/icon_bookmark_red-fill.png";

interface props {}

// eslint-disable-next-line react/display-name
const Toast = forwardRef((props: props, ref) => {
  const [toast, setToast] = useRecoilState(toastState);

  const [springs, api] = useSpring(() => ({
    top: -60,
    config: {
      mass: 2,
      friction: 37,
      tension: 400,
    },
    onRest(result) {
      if (result.value.top === -60) {
        setToast({
          visible: false,
          message: "",
          type: "",
          request: "",
        });
      }
    },
  }));

  useImperativeHandle(ref, () => ({
    show,
  }));

  const show = () => {
    api.start({
      from: {
        top: -60,
      },
      to: {
        top: 40,
      },
    });

    setTimeout(() => {
      hide();
    }, 1400);
  };

  const hide = () => {
    api.start({
      from: {
        top: 40,
      },
      to: {
        top: -60,
      },
    });
  };

  return (
    <animated.div
      style={{
        ...springs,
      }}
      className="toast"
    >
      <Image
        width={24}
        height={24}
        alt={"icon_check_circle"}
        src={
          toast.type === "confirm"
            ? icon_check_circle
            : toast.type === "exclamation"
            ? icon_exclamation
            : toast.type === "warning"
            ? icon_warning
            : toast.type === "bookmark"
            ? icon_bookmark_red_fill
            : icon_check_circle
        }
      />
      {toast.message}
    </animated.div>
  );
});

export default Toast;
