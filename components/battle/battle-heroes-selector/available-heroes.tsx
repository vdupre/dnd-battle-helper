import React from "react";
import { Hero } from "../../../models/hero";
import { generateHeroesUrl } from "../../../utils/routing";
import { PrimaryButton } from "../../atomic/button/primary-button";

interface AvailableHeroesProps {
  heroes: Hero[];
  availableHeroes: Hero[];
  onHeroSelected: (hero: Hero) => void;
}

export const AvailableHeroes: React.FC<AvailableHeroesProps> = ({
  heroes,
  availableHeroes,
  onHeroSelected,
}) => {
  return (
    <div className="pb-8">
      <h2>Who is involved?</h2>
      {heroes.length > 0 ? (
        availableHeroes.length > 0 ? (
          // list available heroes
          <ul className="list-none grid md:grid-cols-4 gap-2">
            {availableHeroes.map((hero) => (
              <PrimaryButton
                key={`hero-${hero.uuid}`}
                onClick={() => onHeroSelected(hero)}
              >
                {hero.name}
              </PrimaryButton>
            ))}
          </ul>
        ) : (
          // no more heroes available
          <div className="italic">No more available heroes</div>
        )
      ) : (
        // no heroes created
        <PrimaryButton href={generateHeroesUrl()}>
          Create first your heroes
        </PrimaryButton>
      )}
    </div>
  );
};
