"use client";

import { FighterCard } from "@/entities/Fighter/ui/FighterCard";
import { CardList } from "@/widgets/CardList/ui/CardList";
import { useUser } from "@/features/Auth/model/hooks/useAuth";

export const FavouriteFightersList = () => {
  const { data: user } = useUser();
  const favouriteFighters = user?.favouriteFighters || [];

  return (
    <CardList
      bigCards
      items={favouriteFighters}
      renderCard={(fighter) => (
        <FighterCard key={fighter.slug} fighter={fighter} />
      )}
    />
  );
};
