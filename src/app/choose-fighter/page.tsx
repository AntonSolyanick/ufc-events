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

export default async function ChooseFighter() {
  const fighters = await getFighters();
  console.log(fighters);

  return (
    <section>
      <div>
        {fighters.body.data.map((fighter: FighterDocument) => fighter.name)}
      </div>
      <input type="text" placeholder="введите имя бойца" />
    </section>
  );
}
