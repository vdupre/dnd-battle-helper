import React from "react";
import {
  Battle,
  getParticipantsSortedByInitiative,
} from "../../../models/battle";

interface BattleRoundOrderProps {
  battle: Battle;
}

export const RoundOrder: React.FC<BattleRoundOrderProps> = ({ battle }) => {
  const sortedBattleParticipants = getParticipantsSortedByInitiative(battle);

  return (
    <div className="text-sm">
      <div className="flex flex-row flex-wrap">
        {sortedBattleParticipants.map((battleParticipant, index) => (
          <div
            key={`battle-participant-${battleParticipant.uuid}`}
            className="mr-2"
          >
            <span className={`${index + 1 === battle.turn && "font-bold"}`}>
              {index + 1}. {battleParticipant.name} (
              {battleParticipant.initiative})
            </span>
            {index < sortedBattleParticipants.length - 1 && " → "}
          </div>
        ))}
      </div>
    </div>
  );
};
