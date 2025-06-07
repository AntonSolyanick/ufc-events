import { FightersList } from "@/features/FightersList";

type NextFightInfo = {
  firstFighterName: string;
  secondFighterName: string;
  fightDate: string;
  firstFighterSmallImg: string;
  secondFighterSmallImg: string;
};
export type FighterRecord = {
  wins?: number;
  draws?: number;
  loses?: number;
};

export interface FighterDocument {
  name: string;
  fighterRusName: string;
  fighterImage: string;
  slug: string;
  fighterRating: number;
  fighterWeightCategory: string;
  fighterRecord: FighterRecord;
  nextFightInfo: NextFightInfo;
}

const getFighters = async () => {
  const res = await fetch("https://ufc-api-7z3p.onrender.com/api/all-fighters");
  return res.json();
};

export default async function Home() {
  const fighters = await getFighters();
  console.log(fighters);

  return (
    <section>
      <FightersList fighters={fighters.body.data} />
      <input type="text" placeholder="введите имя бойца" />
    </section>
  );
}
