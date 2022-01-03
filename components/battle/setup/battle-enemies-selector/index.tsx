import React, { useState } from "react";
import { Battle, hasHeroesSelectedState } from "../../../../models/battle";
import {
  BattleParticipant,
  createBattleParticipantFromEnemy,
} from "../../../../models/battle-participant";
import { BattleParticipantForm } from "../common/battle-participant-form";
import { BattleEnemies } from "./battle-enemies";
import { CreateEnemyForm } from "./create-enemy-form";

interface BattleEnemiesSelectorProps {
  battle: Battle;
  onSubmit: (battleEnemies: BattleParticipant[]) => void;
}

export const BattleEnemiesSelector: React.FC<BattleEnemiesSelectorProps> = ({
  battle,
  onSubmit,
}) => {
  // state
  const [battleEnemies, setBattleEnemies] = useState<BattleParticipant[]>(
    battle.enemies
  );

  // handler
  const handleEnemyCreated = (name: string) => {
    setBattleEnemies([
      ...battleEnemies,
      createBattleParticipantFromEnemy(name),
    ]);
  };

  const handleSubmit = (battleEnemies: BattleParticipant[]) => {
    setBattleEnemies(battleEnemies);
    onSubmit(battleEnemies);
  };

  return hasHeroesSelectedState(battle) ? (
    <div className="bg-gray-200 p-4 -mx-4">
      <CreateEnemyForm onCreate={handleEnemyCreated} />
      {battleEnemies.length > 0 && (
        <BattleParticipantForm
          battleParticipants={battleEnemies}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  ) : (
    <BattleEnemies battleEnemies={battleEnemies} />
  );
};
