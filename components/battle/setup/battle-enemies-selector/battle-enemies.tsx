import React from "react";
import { BattleParticipant } from "../../../../models/battle-participant";

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
          className="flex flex-row justify-between items-center pb-2"
        >
          <div className="w-1/2">{battleEnemy.name}</div>
          <div className="w-28 pr-2 blur-sm hover:blur-none">
            HP: {battleEnemy.hp}/{battleEnemy.maxHp}
          </div>
          <div className="w-14 pr-2">I: {battleEnemy.initiative}</div>
          <div className="">{battleEnemy.isSurprised ? "😮" : "🙂"}</div>
        </div>
      ))}
    </div>
  );
};
