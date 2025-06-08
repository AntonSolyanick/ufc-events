"use client";

import { useUser } from "@/features/Auth/model/hooks/useAuth";
import { FightersList } from "@/features/FightersList";

export default function FavouriteFighters() {
  const { data: user, isLoading } = useUser();
  if (isLoading) return <div>...Loading</div>;

  return (
    <section>
      Favourite fighters
      {user?.favouriteFighters && (
        <FightersList fighters={user.favouriteFighters} />
      )}
      <input type="text" placeholder="введите имя бойца" />
    </section>
  );
}
