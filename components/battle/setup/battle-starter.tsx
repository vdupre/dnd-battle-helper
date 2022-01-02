import React from "react";
import { Battle, hasEnemiesSelectedState } from "../../../models/battle";
import { generateBattleFightUrl } from "../../../utils/routing";
import { PrimaryButton } from "../../atomic/button/primary-button";

interface BattleStarterProps {
  battle: Battle;
  onStart: () => void;
}

export const BattleStarter: React.FC<BattleStarterProps> = ({
  battle,
  onStart,
}) => {
  return (
    <div className="bg-gray-200 p-4 text-center">
      {hasEnemiesSelectedState(battle) ? (
        <PrimaryButton onClick={onStart}>Start the battle</PrimaryButton>
      ) : (
        <PrimaryButton href={generateBattleFightUrl(battle)}>
          Join the battle
        </PrimaryButton>
      )}
    </div>
  );
};
