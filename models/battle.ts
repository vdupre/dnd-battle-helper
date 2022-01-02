import { v4 as uuidV4 } from "uuid";
import { BattleParticipant } from "./battle-participant";

export enum STATES {
  CREATED = 1,
  HEROES_SELECTED = 2,
  ENEMIES_SELECTED = 3,
  STARTED = 4,
}

export enum SURPRISE_ROUND {
  NONE = "none",
  HEROES_ADVANTAGE = "heroes-advantage",
  ENEMIES_ADVANTAGE = "enemies-advantage",
}

export interface Battle {
  uuid: string;
  name: string;
  state: STATES;
  heroes: BattleParticipant[];
  enemies: BattleParticipant[];
  surpriseRound: SURPRISE_ROUND;
}

// battle management

export const createBattleFromName = (name: string): Battle => ({
  uuid: uuidV4(),
  name,
  state: STATES.CREATED,
  heroes: [],
  enemies: [],
  surpriseRound: SURPRISE_ROUND.NONE,
});

export const addHeroesToBattle = (
  battle: Battle,
  heroes: BattleParticipant[]
): Battle => ({
  ...battle,
  state: STATES.HEROES_SELECTED,
  heroes,
});

export const addEnemiesToBattle = (
  battle: Battle,
  enemies: BattleParticipant[]
): Battle => ({
  ...battle,
  state: STATES.ENEMIES_SELECTED,
  enemies,
});

export const startBattle = (
  battle: Battle,
  surpriseRound: SURPRISE_ROUND
): Battle => ({
  ...battle,
  state: STATES.STARTED,
  surpriseRound,
});

// state management

export const hasCreatedState = (battle: Battle) =>
  battle.state === STATES.CREATED;

export const hasHeroesSelectedState = (battle: Battle) =>
  battle.state === STATES.HEROES_SELECTED;

export const hasAtLeastHeroesSelectedState = (battle: Battle) =>
  battle.state >= STATES.HEROES_SELECTED;

export const hasAtLeastEnemiesSelectedState = (battle: Battle) =>
  battle.state >= STATES.ENEMIES_SELECTED;
