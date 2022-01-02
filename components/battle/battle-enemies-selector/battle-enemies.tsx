import React from "react";
import { BattleParticipant } from "../../../models/battle-participant";

interface AvailableHeroesProps {
  battleEnemies: BattleParticipant[];
}

export const BattleEnemies: React.FC<AvailableHeroesProps> = ({
  battleEnemies,
}) => {
  return (
    <div>
      <h2>Enemies</h2>
      {battleEnemies.map((battleEnemy) => (
        <div
          key={`battle-hero-${battleEnemy.uuid}`}
          className="flex flex-row space-x-2 items-center pb-2"
        >
          <div className="grow">{battleEnemy.name}</div>
          <div className="flex-none w-1/4 md:w-1/6 blur-sm hover:blur-none">
            {battleEnemy.hp} hp
          </div>
          <div className="flex-none w-1/4 md:w-1/6">
            {battleEnemy.initiative} initiative
          </div>
          <div className="flex-none">
            {battleEnemy.isSurprised ? "😮" : "🙂"}
          </div>
        </div>
      ))}
    </div>
  );
};
