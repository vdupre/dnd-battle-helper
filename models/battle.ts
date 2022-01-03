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
  enemies: BattleParticipant[];
  round: number;
  turn: number;
}

// battle management

export const createBattleFromName = (name: string): Battle => ({
  uuid: uuidV4(),
  name,
  state: STATES.CREATED,
  heroes: [],
  enemies: [],
  round: 1,
  turn: 1,
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

export const startBattle = (battle: Battle): Battle => ({
  ...battle,
  state: STATES.STARTED,
});

// state management

export const hasCreatedState = (battle: Battle) =>
  battle.state === STATES.CREATED;

export const hasHeroesSelectedState = (battle: Battle) =>
  battle.state === STATES.HEROES_SELECTED;

export const hasAtLeastHeroesSelectedState = (battle: Battle) =>
  battle.state >= STATES.HEROES_SELECTED;

export const hasEnemiesSelectedState = (battle: Battle) =>
  battle.state === STATES.ENEMIES_SELECTED;

export const hasAtLeastEnemiesSelectedState = (battle: Battle) =>
  battle.state >= STATES.ENEMIES_SELECTED;

export const hasStartedState = (battle: Battle) =>
  battle.state === STATES.STARTED;

// field management

export const getParticipantsSortedByInitiative = (battle: Battle) => {
  return (
    [...battle.heroes, ...battle.enemies]
      // remove dead participants
      .filter((participant) => participant.hp > 0)
      // if first round, remove surprised participants
      .filter((participant) => battle.round > 1 || !participant.isSurprised)
      // order by initiative (advantage for heroes in case of same initiative)
      .sort((p1, p2) => (p1.initiative > p2.initiative ? -1 : 1))
  );
};
