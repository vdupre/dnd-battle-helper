import React from "react";
import { BattleParticipant } from "../../../models/battle-participant";
import { BattleParticipantForm } from "../battle-participant-form";

interface SelectedHeroesFormProps {
  battleHeroes: BattleParticipant[];
  onSubmit: (battleHeroes: BattleParticipant[]) => void;
}

export const SelectedHeroesForm: React.FC<SelectedHeroesFormProps> = ({
  battleHeroes,
  onSubmit,
}) => {
  return (
    <div>
      <h2>Selected heroes</h2>
      {battleHeroes.length > 0 ? (
        <BattleParticipantForm
          battleParticipants={battleHeroes}
          onSubmit={onSubmit}
        />
      ) : (
        <div className="italic">Please select a least one hero</div>
      )}
    </div>
  );
};
