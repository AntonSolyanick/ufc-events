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

import { useFavouriteFighters } from "@/features/FavouriteFightersList/model/hooks/useFavouriteFighter";

interface FighterCardProps {
  fighter: Fighter;
}

export const FighterCard = (props: FighterCardProps) => {
  const { fighter } = props;
  const { data: user } = useUser();
  const { addFavouriteFighter, removeFavouriteFighter } =
    useFavouriteFighters();

  const isFavourite = user?.favouriteFighters?.some(
    (favouriteFighter) => favouriteFighter._id === fighter._id
  );

  const handleFavouriteClick = () => {
    if (isFavourite) {
      removeFavouriteFighter.mutate(fighter._id);
    } else {
      addFavouriteFighter.mutate(fighter._id);
    }
  };

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
            text={`Побед:${fighter?.fighterRecord?.wins || 0} Ничьих:${
              fighter?.fighterRecord?.draws || 0
            } Поражений:${fighter?.fighterRecord?.loses || 0}`}
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

      {user && (
        <Button
          className={cls.addButton}
          onClick={handleFavouriteClick}
          //  loading={addFavourite.isLoading || removeFavouriteFighter.isLoading}
        >
          {isFavourite ? "Удалить из избранного" : "Добавить в избранное"}
        </Button>
      )}
      {!user && (
        <Text
          className={cls.addButton}
          text="Авторизуйтесь для добавления бойцов в избранное"
        />
      )}
    </Card>
  );
};
