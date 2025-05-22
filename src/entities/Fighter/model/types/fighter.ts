export type NextFightInfo = {
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

export interface Fighter {
  name: string;
  fighterRusName: string;
  fighterImage: string;
  slug: string;
  fighterRating: number;
  fighterWeightCategory: string;
  fighterRecord: FighterRecord;
  nextFightInfo: NextFightInfo;
}
