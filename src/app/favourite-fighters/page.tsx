import { FavouriteFightersList } from "@/features/FavouriteFightersList";

export default function FavouriteFighters() {
  return (
    <section>
      Favourite fighters
      <FavouriteFightersList />
      <input type="text" placeholder="введите имя бойца" />
    </section>
  );
}
