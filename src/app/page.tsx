"use client";

import { FightersList } from "@/features/FightersList";
import { useFighters } from "@/features/FightersList/model/hooks/useFighters";

export default function Home() {
  const { data: fighters, isLoading } = useFighters();

  if (isLoading) return <div>Loading...</div>;

  return (
    <section>
      <FightersList fighters={fighters!} />
      <input type="text" placeholder="введите имя бойца" />
    </section>
  );
}
