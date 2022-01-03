import { v4 as uuidV4 } from "uuid";

export interface Hero {
  uuid: string;
  name: string;
  maxHp: number;
}

export const createHero = (name: string, maxHp: number): Hero => ({
  uuid: uuidV4(),
  name,
  maxHp,
});
