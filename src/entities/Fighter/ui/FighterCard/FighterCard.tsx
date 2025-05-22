import Image from "next/image";

import { Card } from "@/shared/ui/Card";
import { Fighter } from "../../model/types/fighter";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Text } from "@/shared/ui/Text.tsx";
import cls from "./FighterCard.module.css";
import { Button } from "@/shared/ui/Button";

interface FighterCardProps {
  fighter: Fighter;
}

export const FighterCard = (props: FighterCardProps) => {
  const { fighter } = props;

  return (
    <Card className={classNames(cls.FighterCard)}>
      <Image
        src={fighter.fighterImage}
        alt="fighter image"
        width={180}
        height={274}
      ></Image>
      <div className={cls.textContainer}>
        <Text title={fighter.fighterRusName} />
        <div className={cls.fighterInfo}>
          <Text
            text={`Побед:${fighter.fighterRecord.wins} Ничьих:${fighter.fighterRecord.draws} Поражений:${fighter.fighterRecord.loses}`}
          />
          <Text text={`Позиция в рейтинге: ${fighter.fighterRating}`} />
          <Text text={fighter.fighterWeightCategory} />
        </div>
      </div>

      {fighter.nextFightInfo ? (
        <div className={cls.nextFightInfo}>
          <Text text="Следующий бой" />
          <Text text={fighter.nextFightInfo.fightDate} />
          <Image
            src={fighter.nextFightInfo.firstFighterSmallImg}
            alt="fighter image"
            width={256 / 2}
            height={160 / 2}
          ></Image>
          <Text text={fighter.nextFightInfo.firstFighterName} />
        </div>
      ) : (
        <div className={cls.nextFightInfo}>
          <Text text="Следующий бой не назначен" />
        </div>
      )}

      <Button className={cls.addButton}> Добавить бойца в избранное</Button>
    </Card>
  );
};
