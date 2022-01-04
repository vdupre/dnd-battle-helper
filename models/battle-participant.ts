import { v4 as uuidV4 } from "uuid";
import { Hero } from "./hero";

enum PARTICIPANT_TYPE {
  HERO = "hero",
  ENEMY = "enemy",
}

export enum CONDITIONS {
  PRONE = "prone",
  GRAPPLED = "grappled",
  DEAFENED = "deafened",
  BLINDED = "blinded",
  CHARMED = "charmed",
  FRIGHTENED = "frightened",
  POISONED = "poisoned",
  RESTRAINED = "restrained",
  STUNNED = "stunned",
  INCAPACITED = "incapacited",
  UNCONSCIOUS = "unconscious",
  INVISIBLE = "invisible",
  PARALYZED = "paralyzed",
  PETRIFIED = "petrified",
}

export type BattleParticipant = {
  type: PARTICIPANT_TYPE;
  uuid: string;
  name: string;
  maxHp: number;
  hp: number;
  initiative: number;
  isSurprised: boolean;
  conditions: CONDITIONS[];
};

export const createBattleParticipantFromHero = (
  hero: Hero
): BattleParticipant => ({
  type: PARTICIPANT_TYPE.HERO,
  uuid: hero.uuid,
  name: hero.name,
  maxHp: hero.maxHp,
  hp: hero.maxHp,
  initiative: 0,
  isSurprised: false,
  conditions: [],
});

export const createBattleParticipantFromEnemy = (
  name: string
): BattleParticipant => ({
  type: PARTICIPANT_TYPE.ENEMY,
  uuid: uuidV4(),
  name,
  maxHp: 0,
  hp: 0,
  initiative: 0,
  isSurprised: false,
  conditions: [],
});

export const setupBattleParticipantParams = (
  battleParticipant: BattleParticipant,
  hp: number,
  initiative: number,
  isSurprised: boolean
): BattleParticipant => ({
  ...battleParticipant,
  maxHp: battleParticipant.maxHp > 0 ? battleParticipant.maxHp : hp,
  hp,
  initiative,
  isSurprised,
});
