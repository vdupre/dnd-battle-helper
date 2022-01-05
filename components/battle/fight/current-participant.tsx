import React from "react";
import { BattleParticipant } from "../../../models/battle-participant";
import { BattleParticipantForm } from "./battle-participant-form";

interface CurrentParticipantProps {
  battleParticipant: BattleParticipant;
}

export const CurrentParticipant: React.FC<CurrentParticipantProps> = ({
  battleParticipant,
}) => {
  return (
    <div>
      <h2>Participant turn</h2>
      <BattleParticipantForm
        formDisplayed
        battleParticipant={battleParticipant}
      />
    </div>
  );
};
