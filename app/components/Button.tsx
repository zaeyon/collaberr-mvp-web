import "./Button.scss";
import classNames from "classnames";

interface props {
  size: string;
  style: string;
  label: string;
  state: string;
  onClick?: any;
}

export default function Button({ size, style, label, state, onClick }: props) {
  return (
    <button
      type={"button"}
      onClick={(event) => (onClick ? onClick(event) : "")}
      disabled={state === "disabled" ? true : false}
      className={
        state === "default"
          ? classNames("Button", size, style)
          : state === "disabled"
          ? classNames("Button", size, `${style}_disabled`)
          : ""
      }
    >
      {label}
    </button>
  );
}
