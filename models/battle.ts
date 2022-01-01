import { v4 as uuidV4 } from "uuid";
import { BattleHero } from "./hero";

enum STATES {
  CREATED = "created",
  HEROES_SELECTED = "heroes selected",
}

export interface Battle {
  uuid: string;
  name: string;
  state: STATES;
  heroes: BattleHero[];
}

export const createBattleFromName = (name: string): Battle => ({
  uuid: uuidV4(),
  name,
  state: STATES.CREATED,
  heroes: [],
});

export const addHeroesToBattle = (
  battle: Battle,
  battleHeroes: BattleHero[]
): Battle => ({
  ...battle,
  state: STATES.HEROES_SELECTED,
  heroes: battleHeroes,
});

export const hasCreatedState = (battle: Battle) =>
  battle.state === STATES.CREATED;
export const hasHeroesSelectedState = (battle: Battle) =>
  battle.state === STATES.CREATED;
