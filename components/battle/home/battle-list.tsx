import React from "react";
import { Battle } from "../../../models/battle";
import { generateBattleUrl } from "../../../utils/routing";
import { EntityCard } from "../../atomic/entity-card";

interface BattleListProps {
  battles: Battle[];
  onDelete: (battle: Battle) => void;
}

export const BattleList: React.FC<BattleListProps> = ({
  battles,
  onDelete,
}) => {
  return (
    <div>
      <h2>Existing battles</h2>
      {battles.length > 0 ? (
        // display list
        <ul className="list-none">
          {battles.map((battle: Battle) => (
            <li key={`battle-${battle.uuid}`} className="pb-2">
              <EntityCard
                entity={battle}
                onDelete={onDelete}
                href={generateBattleUrl(battle)}
              />
            </li>
          ))}
        </ul>
      ) : (
        // empty state
        <div className="italic">No battles created so far</div>
      )}
    </div>
  );
};
