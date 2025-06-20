import { classNames, Mods } from "@/shared/lib/classNames/classNames";
import { HTMLAttributes } from "react";

import cls from "./Text.module.css";

export enum TextAlign {
  RIGHT = "right",
  LEFT = "left",
  CENTER = "center",
}

export enum TextSize {
  S = "size_s",
  M = "size_m",
  L = "size_l",
}

interface TextProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  title?: string;
  text?: string;
  error?: string;
  align?: TextAlign;
  size?: TextSize;
}

export const Text = (props: TextProps) => {
  const {
    className,
    text,
    title,
    error,
    align = TextAlign.CENTER,
    size = TextSize.M,
    ...otherProps
  } = props;
  const mods: Mods = {
    [cls[align]]: true,
    [cls[size]]: true,
  };

  return (
    <div className={classNames(cls.Text, mods, [className])} {...otherProps}>
      {title && <h2 className={cls.title}>{title}</h2>}
      {text && <p className={cls.text}>{text}</p>}
      {error && <p className={cls.error}>{error}</p>}
    </div>
  );
};
