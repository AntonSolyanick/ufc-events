import { HTMLAttributes, ReactNode } from "react";

import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./Card.module.css";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
  max?: boolean;
}

export const Card = (props: CardProps) => {
  const { children, className, max, ...otherProps } = props;
  return (
    <article
      className={classNames(cls.Card, { [cls.max]: max }, [className])}
      {...otherProps}
    >
      {children}
    </article>
  );
};
