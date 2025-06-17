import { HTMLAttributes } from "react";

import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./CardList.module.css";

interface CardListProps<T> extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  items: T[];
  renderCard: (card: T) => React.ReactNode;
  bigCards?: boolean;
}

export const CardList = <T,>(props: CardListProps<T>) => {
  const { items, renderCard, bigCards, className, ...otherProps } = props;

  return (
    <div
      className={classNames(cls.CardList, { [cls.bigCards]: bigCards }, [
        className,
      ])}
      {...otherProps}
    >
      {items.map((card) => renderCard(card))}
    </div>
  );
};
