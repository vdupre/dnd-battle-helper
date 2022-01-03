import React from "react";
import { Battle, hasStartedState, STATES } from "../../../models/battle";
import { RoundOrder } from "./round-order";

interface BattleHeaderProps {
  battle: Battle;
  displayRoundOrder?: boolean;
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

export const BattleHeader: React.FC<BattleHeaderProps> = ({
  battle,
  displayRoundOrder = false,
}) => {
  return (
    <div>
      <h1>Battle: {battle.name}</h1>
      <p className="text-sm mb-2">
        {getLabelFromState(battle.state)}
        {hasStartedState(battle) && (
          <span>{` - round ${battle.round}, turn ${battle.turn}`}</span>
        )}
      </p>
      {displayRoundOrder && hasStartedState(battle) && (
        <div className="bg-gray-200 px-4 py-1 -mx-4">
          <RoundOrder battle={battle} />
        </div>
      )}
    </div>
  );
};
