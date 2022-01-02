import { v4 as uuidV4 } from "uuid";
import { BattleParticipant } from "./battle-participant";

export enum STATES {
  CREATED = 1,
  HEROES_SELECTED = 2,
  ENEMIES_SELECTED = 3,
  STARTED = 4,
}

export interface Battle {
  uuid: string;
  name: string;
  state: STATES;
  heroes: BattleParticipant[];
}

// battle management

export const createBattleFromName = (name: string): Battle => ({
  uuid: uuidV4(),
  name,
  state: STATES.CREATED,
  heroes: [],
});

export const addHeroesToBattle = (
  battle: Battle,
  heroes: BattleParticipant[]
): Battle => ({
  ...battle,
  state: STATES.HEROES_SELECTED,
  heroes,
});

// state management

export const hasCreatedState = (battle: Battle) =>
  battle.state === STATES.CREATED;

export const hasAtLeastHeroesSelectedState = (battle: Battle) =>
  battle.state >= STATES.HEROES_SELECTED;

export const hasAtLeastEnemiesSelectedState = (battle: Battle) =>
  battle.state >= STATES.ENEMIES_SELECTED;
