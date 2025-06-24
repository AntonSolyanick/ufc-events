"use client";

import Image from "next/image";
import { TbUserQuestion } from "react-icons/tb";

import { Card } from "@/shared/ui/Card";
import { Fighter } from "../../model/types/fighter";
import { Text } from "@/shared/ui/Text";
import cls from "./FighterCard.module.css";
import { Button, ButtonTheme } from "@/shared/ui/Button";
import { FighterImageSize } from "../../model/сonstants";
import { useUser } from "@/features/Auth/model/hooks/useAuth";
import { useFavouriteFighters } from "@/features/FavouriteFightersList/model/hooks/useFavouriteFighter";
import { VStack } from "@/shared/ui/Stack/VStack/VStack";
import { usePathname } from "next/navigation";
import { useRef } from "react";

interface FighterCardProps {
  fighter: Fighter;
}

export const FighterCard = (props: FighterCardProps) => {
  const { fighter } = props;
  const cardRef = useRef<HTMLDivElement>(null);
  const pathName = usePathname();
  const { data: user } = useUser();
  const { addFavouriteFighter, removeFavouriteFighter } =
    useFavouriteFighters();

  const isFavourite = user?.favouriteFighters?.some(
    (favouriteFighter) => favouriteFighter._id === fighter._id
  );

  const handleFavouriteClick = () => {
    if (isFavourite) {
      if (pathName === "/favourite-fighters")
        cardRef.current!.classList.add(cls.removeCard);
      removeFavouriteFighter.mutate(fighter._id);
    } else {
      addFavouriteFighter.mutate(fighter._id);
    }
  };

  return (
    <div ref={cardRef} className={isFavourite ? cls.favourite : ""}>
      <Card className={cls.FighterCard}>
        <Image
          className={cls.bigFighterImage}
          src={fighter.fighterImage}
          alt="fighter image"
          width={FighterImageSize.FIGHTER_IMAGE_WIDTH}
          height={FighterImageSize.FIGHTER_IMAGE_HEIGHT}
          priority
        ></Image>
        <VStack className={cls.textContainer}>
          <Text title={fighter.fighterRusName} />
          <div className={cls.fighterInfo}>
            <Text
              text={`Побед:${fighter?.fighterRecord?.wins || 0}  Ничьих:${
                fighter?.fighterRecord?.draws || 0
              }  Поражений:${fighter?.fighterRecord?.loses || 0}`}
            />
            <Text
              text={`Позиция в рейтинге: ${fighter.fighterRating || "-"}`}
            />
            <Text text={fighter.fighterWeightCategory} />
          </div>
        </VStack>

        {fighter.nextFightInfo ? (
          <VStack className={cls.nextFightInfo}>
            <Text text="Следующий бой" />
            <Text text={fighter.nextFightInfo.fightDate} />
            <Image
              className={cls.portraitFighterImage}
              src={fighter.nextFightInfo.firstFighterSmallImg}
              alt="fighter image"
              width={FighterImageSize.PORTRAIT_FIGHTER_IMAGE_WIDTH}
              height={FighterImageSize.PORTRAIT_FIGHTER_IMAGE_HEIGHT}
            ></Image>
            <Text text={fighter.nextFightInfo.firstFighterName} />
          </VStack>
        ) : (
          <VStack className={cls.nextFightInfo}>
            <Text text="Следующий бой" />
            <TbUserQuestion className={cls.questionIcon} />
          </VStack>
        )}

        {user && (
          <Button
            theme={ButtonTheme.SOLID}
            className={cls.addButton}
            onClick={handleFavouriteClick}
            disabled={
              addFavouriteFighter.isPending || removeFavouriteFighter.isPending
            }
          >
            {isFavourite ? "Удалить из моего списка" : "Добавить в мой список"}
          </Button>
        )}
        {!user && (
          <Text
            className={cls.addButton}
            error="Авторизуйтесь для добавления бойцов в мой список"
          />
        )}
      </Card>
    </div>
  );
};
