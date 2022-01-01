import React, { useState } from "react";
import { Battle, hasCreatedState } from "../../../models/battle";
import {
  BattleHero,
  createBattleHeroFromHero,
  Hero,
} from "../../../models/hero";
import { AvailableHeroes } from "./available-heroes";
import { BattleHeroes } from "./battle-heroes";
import { SelectedHeroes } from "./selected-heroes";

interface BattleHeroesSelectorFormProps {
  battle: Battle;
  heroes: Hero[];
  onSubmit: (battleHeroes: BattleHero[]) => void;
}

export const BattleHeroesSelector: React.FC<BattleHeroesSelectorFormProps> = ({
  battle,
  heroes,
  onSubmit,
}) => {
  // state
  const battleHeroesUuids = battle.heroes.map((h) => h.uuid);
  const [availableHeroes, setAvailableHeroes] = useState<Hero[]>(
    heroes.filter((h) => !battleHeroesUuids.includes(h.uuid))
  );
  const [battleHeroes, setBattleHeroes] = useState<BattleHero[]>(battle.heroes);

  // handlers
  const handleHeroSelected = (selectedHero: Hero) => {
    // remove hero from available ones
    const newAvailableHeroes = availableHeroes.filter(
      (hero) => hero.uuid !== selectedHero.uuid
    );
    setAvailableHeroes(newAvailableHeroes);

    // add hero to the battle heroes
    const newBattleHeroes = [
      ...battleHeroes,
      createBattleHeroFromHero(selectedHero),
    ].sort((a, b) => a.name.localeCompare(b.name));
    setBattleHeroes(newBattleHeroes);
  };

  const handleSubmit = (battleHeroes: BattleHero[]) => {
    setBattleHeroes(battleHeroes);
    onSubmit(battleHeroes);
  };

  return (
    <>
      {hasCreatedState(battle) ? (
        <div className="bg-gray-200 p-4">
          <AvailableHeroes
            heroes={heroes}
            availableHeroes={availableHeroes}
            onHeroSelected={handleHeroSelected}
          />

          <SelectedHeroes battleHeroes={battleHeroes} onSubmit={handleSubmit} />
        </div>
      ) : (
        <BattleHeroes battleHeroes={battleHeroes} />
      )}
    </>
  );
};
