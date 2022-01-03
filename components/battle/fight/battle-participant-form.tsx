import React from "react";
import { BattleParticipant } from "../../../models/battle-participant";

interface BattleParticipantFormProps {
  battleParticipant: BattleParticipant;
}

export const BattleParticipantForm: React.FC<BattleParticipantFormProps> = ({
  battleParticipant,
}) => {
  return (
    <div>
      <h2>{battleParticipant.name}</h2>
    </div>
  );
};
