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
      {battleEnemies.map((battleEnemi) => (
        <div
          key={`battle-hero-${battleEnemi.uuid}`}
          className="flex flex-row space-x-2 items-center pb-2"
        >
          <div className="grow">{battleEnemi.name}</div>
          <div className="flex-none w-1/4 md:w-1/6 blur-sm hover:blur-none">
            {battleEnemi.hp} hp
          </div>
          <div className="flex-none w-1/4 md:w-1/6">
            {battleEnemi.initiative} initiative
          </div>
        </div>
      ))}
    </div>
  );
};
