import React from "react";
import { Battle } from "../../models/battle";

interface BattleHeaderProps {
  battle: Battle;
}

export const BattleHeader: React.FC<BattleHeaderProps> = ({ battle }) => {
  return (
    <div>
      <h1>Battle: {battle.name}</h1>
      <p className="italic mb-2 px-2 py-1 text-sm bg-gray-300 rounded-md inline-block">
        {battle.state}
      </p>
    </div>
  );
};
