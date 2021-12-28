import Image from "next/image";
import React from "react";
import { Hero } from "../../../models/hero";
import { DangerButton } from "../../atomic/button/danger-button";

interface HeroCardInput {
  hero: Hero;
  onDelete: (hero: Hero) => void;
}

export const HeroCard: React.FC<HeroCardInput> = ({ hero, onDelete }) => {
  return (
    <div className="rounded p-4 bg-gray-300 border border-cyan-50">
      <div className="flex flex-row space-x-2 items-center">
        <div className="grow">{hero.name}</div>
        <div className="flex-none w-10">
          <DangerButton onClick={() => onDelete(hero)} withIcon={true}>
            <Image src="/trash-white.svg" width={24} height={24} />
          </DangerButton>
        </div>
      </div>
    </div>
  );
};
