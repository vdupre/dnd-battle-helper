import React from "react";
import { Battle, STATES } from "../../models/battle";

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
      <p className="italic mb-2 px-2 py-1 text-sm bg-gray-300 rounded-md inline-block">
        {getLabelFromState(battle.state)}
      </p>
    </div>
  );
};
