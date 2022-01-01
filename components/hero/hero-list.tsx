import React from "react";
import { Hero } from "../../models/hero";
import { EntityCard } from "../atomic/entity-card";

interface HeroListProps {
  heroes: Hero[];
  onDelete: (hero: Hero) => void;
}

export const HeroList: React.FC<HeroListProps> = ({ heroes, onDelete }) => {
  return (
    <div>
      <h2>Existing heroes</h2>
      {heroes.length > 0 ? (
        // display list
        <ul className="list-none">
          {heroes.map((hero: Hero) => (
            <li key={`hero-${hero.uuid}`} className="pb-2">
              <EntityCard entity={hero} onDelete={onDelete} />
            </li>
          ))}
        </ul>
      ) : (
        // empty state
        <div className="italic">No heroes created so far</div>
      )}
    </div>
  );
};
