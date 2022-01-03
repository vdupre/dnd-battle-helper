import { v4 as uuidV4 } from "uuid";
import { Hero } from "./hero";

enum PARTICIPANT_TYPE {
  HERO = "hero",
  ENEMY = "enemy",
}

export type BattleParticipant = {
  type: PARTICIPANT_TYPE;
  uuid: string;
  name: string;
  maxHp: number;
  hp: number;
  initiative: number;
  isSurprised: boolean;
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
