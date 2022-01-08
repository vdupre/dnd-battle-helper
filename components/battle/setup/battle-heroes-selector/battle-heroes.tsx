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
      {battleHeroes.map((battleHero) => (
        <div
          key={`battle-hero-${battleHero.uuid}`}
          className="flex flex-row justify-between items-center pb-2"
        >
          <div className="w-1/2">{battleHero.name}</div>
          <div className="w-28 pr-2">
            HP: {battleHero.hp}/{battleHero.maxHp}
          </div>
          <div className="w-14 pr-2">I: {battleHero.initiative}</div>
          <div className="">{battleHero.isSurprised ? "😮" : "🙂"}</div>
        </div>
      ))}
    </div>
  );
};
