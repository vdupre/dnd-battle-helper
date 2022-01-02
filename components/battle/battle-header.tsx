import React from "react";
import { Battle, hasStartedState, STATES } from "../../models/battle";

interface BattleHeaderProps {
  battle: Battle;
}

const getLabelFromState = (state: STATES) => {
  switch (state) {
    case STATES.CREATED:
      return "created";
    case STATES.HEROES_SELECTED:
      return "heroes selected";
    case STATES.ENEMIES_SELECTED:
      return "enemies selected";
    case STATES.STARTED:
      return "started";
  }
};

export const BattleHeader: React.FC<BattleHeaderProps> = ({ battle }) => {
  return (
    <div>
      <h1>Battle: {battle.name}</h1>
      <p className="mb-2 text-sm ">
        {getLabelFromState(battle.state)}
        {hasStartedState(battle) && (
          <span>{` - round ${battle.round}, turn ${battle.turn}`}</span>
        )}
      </p>
    </div>
  );
};
