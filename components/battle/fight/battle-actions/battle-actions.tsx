import React from "react";
import {
  Battle,
  nextBattleTurn,
  previousBattleTurn,
} from "../../../../models/battle";
import { PrimaryButton } from "../../../atomic/button/primary-button";

interface BattleActionsProps {
  battle: Battle;
  onTurnChanged: (battle: Battle) => void;
}

export const BattleActions: React.FC<BattleActionsProps> = ({
  battle,
  onTurnChanged,
}) => {
  // handlers
  const handlePreviousTurnClicked = () => {
    const newBattle = previousBattleTurn(battle);
    onTurnChanged(newBattle);
  };
  const handleNextTurnClicked = () => {
    const newBattle = nextBattleTurn(battle);
    onTurnChanged(newBattle);
  };

  return (
    <div className="flex flex-row justify-end items-center my-2 space-x-2">
      <PrimaryButton onClick={handlePreviousTurnClicked}>
        Previous
      </PrimaryButton>
      <PrimaryButton onClick={handleNextTurnClicked}>Next</PrimaryButton>
    </div>
  );
};
