import React from "react";
import { BattleParticipant } from "../../../../models/battle-participant";

interface AvailableHeroesProps {
  battleHeroes: BattleParticipant[];
}

export const BattleHeroes: React.FC<AvailableHeroesProps> = ({
  battleHeroes,
}) => {
  return (
    <div>
      <h2>Heroes</h2>
      {battleHeroes.map((battlehero) => (
        <div
          key={`battle-hero-${battlehero.uuid}`}
          className="flex flex-row space-x-2 items-center pb-2"
        >
          <div className="grow">{battlehero.name}</div>
          <div className="flex-none w-1/4 md:w-1/6">{battlehero.hp} hp</div>
          <div className="flex-none w-1/4 md:w-1/6">
            {battlehero.initiative} initiative
          </div>
          <div className="flex-none">
            {battlehero.isSurprised ? "😮" : "🙂"}
          </div>
        </div>
      ))}
    </div>
  );
};
