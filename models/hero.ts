import { v4 as uuidV4 } from "uuid";

export interface Hero {
  uuid: string;
  name: string;
}

export type BattleHero = Hero & {
  hp: number;
  initiative: number;
};

export const createHeroFromName = (name: string): Hero => ({
  uuid: uuidV4(),
  name,
});
