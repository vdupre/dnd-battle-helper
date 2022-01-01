import { Battle } from "../models/battle";

export const generateHomepageUrl = () => `/`;
export const generateHeroesUrl = () => `/heroes`;
export const generateBattleHomepageUrl = () => `/battle`;
export const generateBattleUrl = (battle: Battle) => `/battle/${battle.uuid}`;
