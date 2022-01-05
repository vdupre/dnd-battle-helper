import React from "react";
import { BattleParticipant } from "../../../models/battle-participant";
import { BattleParticipantForm } from "./battle-participant-form";

interface NextParticipantsProps {
  battleParticipants: BattleParticipant[];
}

export const NextParticipants: React.FC<NextParticipantsProps> = ({
  battleParticipants,
}) => {
  return (
    <div>
      <h2>Next participants</h2>
      <ul className="list-none">
        {battleParticipants.map((battleParticipant) => (
          <li
            key={`other-participant-${battleParticipant.uuid}`}
            className="mb-2"
          >
            <BattleParticipantForm battleParticipant={battleParticipant} />
          </li>
        ))}
      </ul>
    </div>
  );
};
