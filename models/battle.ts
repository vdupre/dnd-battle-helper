import { v4 as uuidV4 } from "uuid";
import { BattleParticipant, isHero } from "./battle-participant";

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

export const endBattleTurn = (battle: Battle): Battle => {
  const turnCount = getParticipantCount(battle);
  const currentTurn = battle.turn;
  const currentRound = battle.round;

  const shouldBeNextRound = currentTurn + 1 > turnCount;

  return {
    ...battle,
    turn: shouldBeNextRound ? 1 : currentTurn + 1,
    round: shouldBeNextRound ? currentRound + 1 : currentRound,
  };
};

export const updateParticipant = (
  battle: Battle,
  participant: BattleParticipant
): Battle => {
  const fieldToUpdate: keyof Battle = isHero(participant)
    ? "heroes"
    : "enemies";

  return {
    ...battle,
    [fieldToUpdate]: [
      participant,
      ...battle[fieldToUpdate].filter((p) => p.uuid !== participant.uuid),
    ],
  };
};

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
    getParticipantsWithoutDeadEnemies(battle)
      // if first round, remove surprised participants
      .filter((participant) => battle.round > 1 || !participant.isSurprised)
      // order by initiative (advantage for heroes in case of same initiative)
      .sort((p1, p2) => (p1.initiative > p2.initiative ? -1 : 1))
  );
};

export const getParticipantCount = (battle: Battle): number =>
  getParticipantsWithoutDeadEnemies(battle).length;

const getParticipantsWithoutDeadEnemies = (
  battle: Battle
): BattleParticipant[] =>
  [...battle.heroes, ...battle.enemies].filter(
    (participant) => isHero(participant) || participant.hp > 0
  );

export const getParticipantsSortedByNextTurns = (battle: Battle) => {
  const aliveParticipants = getParticipantsSortedByInitiative(battle);

  return [
    ...aliveParticipants.splice(battle.turn - 1),
    ...aliveParticipants.slice(0, battle.turn - 1),
  ];
};
