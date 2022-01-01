import React, { SyntheticEvent, useRef } from "react";
import { BattleHero } from "../../../models/hero";
import { PrimaryButton } from "../../atomic/button/primary-button";

export enum FIELD_NAMES {
  HP = "hp",
  INITIATIVE = "initiative",
}
export const generateInputName = (uuid: string, fieldName: FIELD_NAMES) =>
  `battleHero[${uuid}][${fieldName}]`;

interface AvailableHeroesProps {
  battleHeroes: BattleHero[];
  onSubmit: (battleHeroes: BattleHero[]) => void;
}

export const SelectedHeroes: React.FC<AvailableHeroesProps> = ({
  battleHeroes,
  onSubmit,
}) => {
  const formRef =
    useRef<HTMLFormElement>() as React.MutableRefObject<HTMLFormElement>;

  // handlers
  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(formRef.current);

    // overrides entites with form data (if valid)
    const newBattleHeroes = battleHeroes.map((battleHero) => {
      const intHP = +(formData.get(
        generateInputName(battleHero.uuid, FIELD_NAMES.HP)
      ) as string);
      const intInitiative = +(formData.get(
        generateInputName(battleHero.uuid, FIELD_NAMES.INITIATIVE)
      ) as string);

      // security: field format validation (TODO do something more user friendly)
      if (
        isNaN(intHP) ||
        intHP < 1 ||
        isNaN(intInitiative) ||
        intInitiative < 1
      ) {
        return null;
      }

      return {
        ...battleHero,
        hp: intHP,
        initiative: intInitiative,
      };
    });

    // security: prevent submit if a value if wrong
    if (newBattleHeroes.some((b) => !b)) {
      console.log("validation error");
      return;
    }

    onSubmit(newBattleHeroes as BattleHero[]);
  };

  return (
    <div>
      <h2>Selected heroes</h2>
      {battleHeroes.length > 0 ? (
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="flex flex-row space-x-2 items-center pb-1">
            <div className="grow"></div>
            {["HP", "Initiative"].map((label) => (
              <div className="flex-none w-1/4 md:w-1/6 text-center font-bold">
                {label}
              </div>
            ))}
          </div>
          {battleHeroes.map((battlehero) => (
            <div
              key={`battle-hero-${battlehero.uuid}`}
              className="flex flex-row space-x-2 items-center pb-2"
            >
              <div className="grow">{battlehero.name}</div>
              {Object.values(FIELD_NAMES).map((fieldName) => (
                <div className="flex-none w-1/4 md:w-1/6">
                  <input
                    name={generateInputName(battlehero.uuid, fieldName)}
                    type="number"
                    defaultValue={battlehero[fieldName]}
                    className="w-full text-center"
                    required={true}
                    onClick={(event: SyntheticEvent<HTMLInputElement>) =>
                      event.currentTarget.select()
                    }
                  />
                </div>
              ))}
            </div>
          ))}
          <div className="text-right">
            <PrimaryButton submit={true}>Validate</PrimaryButton>
          </div>
        </form>
      ) : (
        <div className="italic">Please select a least one hero</div>
      )}
    </div>
  );
};
