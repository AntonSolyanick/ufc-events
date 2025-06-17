"use client";

import { FighterCard } from "@/entities/Fighter/ui/FighterCard";
import { CardList } from "@/widgets/CardList/ui/CardList";
import { useUser } from "@/features/Auth/model/hooks/useAuth";
import cls from "./FavouriteFightersList.module.css";
import { Loader } from "@/shared/ui/Loader";
import { Text } from "@/shared/ui/Text";

export const FavouriteFightersList = () => {
  const { data: user, isLoading } = useUser();
  const favouriteFighters = user?.favouriteFighters || [];

  return (
    <>
      <CardList
        className={cls.container}
        bigCards
        items={favouriteFighters}
        renderCard={(fighter) => (
          <FighterCard key={fighter.slug} fighter={fighter} />
        )}
      />
      <div>{isLoading && <Loader />}</div>
      <div>
        {!user && !isLoading && (
          <Text title="Авторизуйтесь для просмотра своего списка бойцов" />
        )}
      </div>
    </>
  );
};
