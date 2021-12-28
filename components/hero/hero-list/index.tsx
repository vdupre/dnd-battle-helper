import React from "react";
import { Hero } from "../../../models/hero";
import { HeroListEmptyState } from "./empty-state";
import { HeroCard } from "./hero-card";

interface HeroListInput {
  heroes: Hero[];
  onDelete: (hero: Hero) => void;
}

export const HeroList: React.FC<HeroListInput> = ({ heroes, onDelete }) => {
  return (
    <div>
      <h2>Existing heroes</h2>
      {heroes.length > 0 ? (
        <ul className="list-none">
          {heroes.map((hero: Hero) => (
            <li key={`hero-${hero.uuid}`} className="pb-2">
              <HeroCard hero={hero} onDelete={onDelete} />
            </li>
          ))}
        </ul>
      ) : (
        <HeroListEmptyState />
      )}
    </div>
  );
};
