"use client";

import { FighterCard } from "@/entities/Fighter/ui/FighterCard";
import { CardList } from "@/widgets/CardList/ui/CardList";
import { useUser } from "@/features/Auth/model/hooks/useAuth";
import { Loader } from "@/shared/ui/Loader";
import { Text } from "@/shared/ui/Text";
import { TextSize } from "@/shared/ui/Text/Text";

export const FavouriteFightersList = () => {
  const { data: user, isLoading, error: fetchingError } = useUser();
  const favouriteFighters = user?.favouriteFighters || [];

  return (
    <section>
      <CardList
        bigCards
        items={favouriteFighters}
        renderCard={(fighter) => (
          <FighterCard key={fighter.slug} fighter={fighter} />
        )}
      />

      {isLoading && <Loader />}

      {!user && !isLoading && (
        <Text title="Авторизуйтесь для просмотра своего списка бойцов" />
      )}

      {fetchingError && (
        <Text size={TextSize.L} error="При загрузке данных произошла ошибка!" />
      )}
    </section>
  );
};
