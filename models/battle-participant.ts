import { v4 as uuidV4 } from "uuid";
import { Hero } from "./hero";

export type BattleParticipant = {
  uuid: string;
  name: string;
  hp: number;
  initiative: number;
};

export const createBattleParticipantFromHero = (
  hero: Hero
): BattleParticipant => ({
  uuid: hero.uuid,
  name: hero.name,
  hp: 0,
  initiative: 0,
});

export const createBattleParticipantFromName = (
  name: string
): BattleParticipant => ({
  uuid: uuidV4(),
  name,
  hp: 0,
  initiative: 0,
});
