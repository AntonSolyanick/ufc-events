"use client";

import Image from "next/image";

import { Card } from "@/shared/ui/Card";
import { Fighter } from "../../model/types/fighter";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Text } from "@/shared/ui/Text";
import cls from "./FighterCard.module.css";
import { Button } from "@/shared/ui/Button";
import { FighterImageSize } from "../../model/сonstants";
import { useUser } from "@/features/Auth/model/hooks/useAuth";

interface FighterCardProps {
  fighter: Fighter;
}

export const FighterCard = (props: FighterCardProps) => {
  const { fighter } = props;
  const { data: user, isLoading } = useUser();

  console.log("fighter", fighter);
  console.log("favouritefighters", user?.favouriteFighters);
  console.log(user?.favouriteFighters.includes(fighter));

  return (
    <Card className={classNames(cls.FighterCard)}>
      <Image
        src={fighter.fighterImage}
        alt="fighter image"
        width={FighterImageSize.FIGHTER_IMAGE_WIDTH}
        height={FighterImageSize.FIGHTER_IMAGE_HEIGHT}
        priority
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
            width={FighterImageSize.PORTRAIT_FIGHTER_IMAGE_WIDTH}
            height={FighterImageSize.PORTRAIT_FIGHTER_IMAGE_HEIGHT}
          ></Image>
          <Text text={fighter.nextFightInfo.firstFighterName} />
        </div>
      ) : (
        <div className={cls.nextFightInfo}>
          <Text text="Следующий бой не назначен" />
        </div>
      )}
      {user?.favouriteFighters.includes(fighter) ? (
        <Button className={cls.addButton}> Удалить из избранного</Button>
      ) : (
        <Button className={cls.addButton}> Добавить бойца в избранное</Button>
      )}
    </Card>
  );
};
