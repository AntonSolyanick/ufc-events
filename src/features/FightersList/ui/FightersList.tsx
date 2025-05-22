import { HTMLAttributes } from "react";

import { Fighter } from "@/entities/Fighter/model/types/fighter";
import { FighterCard } from "@/entities/Fighter/ui/FighterCard";
import { classNames } from "@/shared/lib/classNames/classNames";
import { CardList } from "@/widgets/CardList/ui/CardList";
import cls from "./FighterList.module.css";

interface FighterListProps extends HTMLAttributes<HTMLDivElement> {
  fighters: Fighter[];
}

export const FightersList = (props: FighterListProps) => {
  return (
    <CardList
      bigCards
      items={props.fighters}
      renderCard={(fighter) => (
        <FighterCard key={fighter.slug} fighter={fighter} />
      )}
    />
  );
};
