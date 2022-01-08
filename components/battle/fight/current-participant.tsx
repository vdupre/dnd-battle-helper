import React from "react";
import { Battle } from "../../../models/battle";
import { BattleParticipant } from "../../../models/battle-participant";
import { BattleParticipantForm } from "./battle-participant-form";

interface CurrentParticipantProps {
  battle: Battle;
  battleParticipant: BattleParticipant;
  onBattleParticipantUpdated: (battleParticipant: BattleParticipant) => void;
}

export const CurrentParticipant: React.FC<CurrentParticipantProps> = ({
  battleParticipant,
  onBattleParticipantUpdated,
}) => {
  return (
    <div>
      <h2>Turn participant</h2>
      <BattleParticipantForm
        battleParticipant={battleParticipant}
        onBattleParticipantUpdated={onBattleParticipantUpdated}
      />
    </div>
  );
};
