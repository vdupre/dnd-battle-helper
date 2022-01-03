import React, { SyntheticEvent, useRef } from "react";
import { Hero, createHero } from "../../models/hero";
import { PrimaryButton } from "../atomic/button/primary-button";

interface HeroFormProps {
  onCreate: (newHero: Hero) => void;
}

export const CreateHeroForm: React.FC<HeroFormProps> = ({ onCreate }) => {
  const formRef =
    useRef<HTMLFormElement>() as React.MutableRefObject<HTMLFormElement>;

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(formRef.current);
    const name = formData.get("name") as string;
    const maxHp = +(formData.get("maxHp") as string);

    // security: mandatory fields
    if (!name || !maxHp) {
      console.log("validation error");
      return;
    }

    // reset fields
    formRef.current.reset();

    // submit new hero
    onCreate(createHero(name, maxHp));
  };

  return (
    <form ref={formRef} className="pb-4" onSubmit={handleSubmit}>
      <h2>Create a new hero</h2>
      <div className="flex flex-row space-x-2">
        <div className="grow">
          <input
            name="name"
            type="text"
            className="w-full rounded-md"
            placeholder="name"
          />
        </div>
        <div className="w-14">
          <input
            name="maxHp"
            type="text"
            className="w-full rounded-md"
            placeholder="hp"
          />
        </div>
        <div className="flex-none">
          <PrimaryButton submit>Create</PrimaryButton>
        </div>
      </div>
    </form>
  );
};
