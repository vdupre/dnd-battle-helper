import React, { useRef } from "react";
import { createHeroFromName, Hero } from "../../models/hero";
import { PrimaryButton } from "../atomic/button/primary-button";

interface HeroFormProps {
  onCreate: (newHero: Hero) => void;
}

export const CreateHeroForm: React.FC<HeroFormProps> = ({ onCreate }) => {
  const namePropsRef = useRef<HTMLInputElement>();

  const handleCreateClick = () => {
    const Props = namePropsRef.current as HTMLInputElement;
    const name = Props.value;

    // security: mandatory field
    if (!name) {
      return;
    }

    // reset field
    Props.value = "";

    // submit new hero
    onCreate(createHeroFromName(name));
  };

  return (
    <form className="pb-4">
      <h2>Create a new hero</h2>
      <div className="flex flex-row space-x-2">
        <input
          type="text"
          className="grow rounded-md"
          placeholder="name"
          ref={namePropsRef}
        />
        <div className="flex-none">
          <PrimaryButton onClick={handleCreateClick}>Create</PrimaryButton>
        </div>
      </div>
    </form>
  );
};
