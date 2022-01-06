import React from "react";
import { Battle, endBattleTurn } from "../../../models/battle";
import { BattleParticipant } from "../../../models/battle-participant";
import { PrimaryButton } from "../../atomic/button/primary-button";
import { BattleParticipantForm } from "./battle-participant-form";

interface CurrentParticipantProps {
  battle: Battle;
  battleParticipant: BattleParticipant;
  onTurnEnded: (battle: Battle) => void;
}

export const CurrentParticipant: React.FC<CurrentParticipantProps> = ({
  battle,
  battleParticipant,
  onTurnEnded,
}) => {
  // handlers
  const handleEndTurnClicked = () => {
    const newBattle = endBattleTurn(battle);
    onTurnEnded(newBattle);
  };

  return (
    <div>
      <div className="flex flex-row justify-between items-center mb-2">
        <h2>Turn participant</h2>
        <div className="px-2">
          <PrimaryButton onClick={handleEndTurnClicked}>End turn</PrimaryButton>
        </div>
      </div>
      <BattleParticipantForm
        formDisplayed
        battleParticipant={battleParticipant}
      />
    </div>
  );
};
