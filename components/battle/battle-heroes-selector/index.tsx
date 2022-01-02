import React, { useState } from "react";
import { Battle, hasCreatedState } from "../../../models/battle";
import {
  BattleParticipant,
  createBattleParticipantFromHero,
} from "../../../models/battle-participant";
import { Hero } from "../../../models/hero";
import { AvailableHeroes } from "./available-heroes";
import { BattleHeroes } from "./battle-heroes";
import { SelectedHeroesForm } from "./selected-heroes-form";

interface BattleHeroesSelectorFormProps {
  battle: Battle;
  heroes: BattleParticipant[];
  onSubmit: (battleHeroes: BattleParticipant[]) => void;
}

export const BattleHeroesSelector: React.FC<BattleHeroesSelectorFormProps> = ({
  battle,
  heroes,
  onSubmit,
}) => {
  // state
  const battleHeroesUuids = battle.heroes.map((h) => h.uuid);
  const [availableHeroes, setAvailableHeroes] = useState<BattleParticipant[]>(
    heroes.filter((h) => !battleHeroesUuids.includes(h.uuid))
  );
  const [battleHeroes, setBattleHeroes] = useState<BattleParticipant[]>(
    battle.heroes
  );

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
      createBattleParticipantFromHero(selectedHero),
    ].sort((a, b) => a.name.localeCompare(b.name));

    setBattleHeroes(newBattleHeroes);
  };

  const handleSubmit = (battleHeroes: BattleParticipant[]) => {
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

          <SelectedHeroesForm
            battleHeroes={battleHeroes}
            onSubmit={handleSubmit}
          />
        </div>
      ) : (
        <BattleHeroes battleHeroes={battleHeroes} />
      )}
    </>
  );
};
