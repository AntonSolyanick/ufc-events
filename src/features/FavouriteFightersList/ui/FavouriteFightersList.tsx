"use client";

import { FighterCard } from "@/entities/Fighter/ui/FighterCard";
import { CardList } from "@/widgets/CardList/ui/CardList";
import { useUser } from "@/features/Auth/model/hooks/useAuth";
import { Loader } from "@/shared/ui/Loader";
import { Text } from "@/shared/ui/Text";
import { TextSize } from "@/shared/ui/Text/Text";
import cls from "./FavouriteFightersList.module.css";

export const FavouriteFightersList = () => {
  const { data: user, isLoading, error: fetchingError } = useUser();
  const favouriteFighters = user?.favouriteFighters || [];

  return (
    <section className={cls.container}>
      {user && (
        <div className={cls.title}>
          <Text size={TextSize.L} title="Мой список бойцов" />
        </div>
      )}
      <CardList
        bigCards
        items={favouriteFighters}
        renderCard={(fighter) => (
          <FighterCard key={fighter.slug} fighter={fighter} />
        )}
      />

      {isLoading && <Loader className={cls.position} />}

      {favouriteFighters.length < 1 && user && !isLoading && (
        <Text className={cls.position} title="Ваш список пуст" />
      )}

      {!user && !isLoading && (
        <Text
          className={cls.position}
          title="Авторизуйтесь для просмотра своего списка бойцов"
        />
      )}

      {fetchingError && (
        <Text
          className={cls.position}
          size={TextSize.L}
          error="При загрузке данных произошла ошибка!"
        />
      )}
    </section>
  );
};
