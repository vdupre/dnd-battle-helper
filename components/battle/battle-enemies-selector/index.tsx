import React from "react";
import { Battle } from "../../../models/battle";

interface BattleEnemiesSelectorProps {
  battle: Battle;
}

export const BattleEnemiesSelector: React.FC<BattleEnemiesSelectorProps> = ({
  battle,
}) => {
  return (
    <div>
      <h2>Enemies</h2>
    </div>
  );
};
