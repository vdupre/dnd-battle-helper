import React, { SyntheticEvent, useRef } from "react";
import {
  BattleParticipant,
  setupBattleParticipantParams,
} from "../../../../models/battle-participant";
import { PrimaryButton } from "../../../atomic/button/primary-button";

export enum FIELD_NAMES {
  HP = "hp",
  INITIATIVE = "initiative",
  IS_SURPRISED = "isSurprised",
}
export const generateBattleParticipantInputName = (
  uuid: string,
  fieldName: FIELD_NAMES
) => `battleParticipant[${uuid}][${fieldName}]`;

interface BattleParticipantFormProps {
  battleParticipants: BattleParticipant[];
  onSubmit: (battleParticipants: BattleParticipant[]) => void;
}

export const BattleParticipantForm: React.FC<BattleParticipantFormProps> = ({
  battleParticipants,
  onSubmit,
}) => {
  const formRef =
    useRef<HTMLFormElement>() as React.MutableRefObject<HTMLFormElement>;

  // handlers
  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(formRef.current);

    // overrides entites with form data (if valid)
    const newBattleParticipants = battleParticipants.map(
      (battleParticipant) => {
        const intHP = +(formData.get(
          generateBattleParticipantInputName(
            battleParticipant.uuid,
            FIELD_NAMES.HP
          )
        ) as string);
        const intInitiative = +(formData.get(
          generateBattleParticipantInputName(
            battleParticipant.uuid,
            FIELD_NAMES.INITIATIVE
          )
        ) as string);
        const boolIsSurprised = !!formData.get(
          generateBattleParticipantInputName(
            battleParticipant.uuid,
            FIELD_NAMES.IS_SURPRISED
          )
        );

        // security: field format validation (TODO do something more user friendly)
        if (
          isNaN(intHP) ||
          intHP < 1 ||
          isNaN(intInitiative) ||
          intInitiative < 1
        ) {
          return null;
        }

        return setupBattleParticipantParams(
          battleParticipant,
          intHP,
          intInitiative,
          boolIsSurprised
        );
      }
    );

    // security: prevent submit if a value if wrong
    if (newBattleParticipants.some((b) => b === null)) {
      console.log("validation error");
      return;
    }

    onSubmit(newBattleParticipants as BattleParticipant[]);
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      {/* headers */}
      <div className="flex flex-row space-x-2 items-center pb-1">
        <div className="grow"></div>
        {[FIELD_NAMES.HP, FIELD_NAMES.INITIATIVE].map((label) => (
          <div
            key={`label-${label}`}
            className="flex-none w-1/4 md:w-1/6 text-center"
          >
            {label}
          </div>
        ))}
        <div className="flex-none text-center font-bold">😮</div>
      </div>

      {/* fields */}
      {battleParticipants.map((battleParticipant) => (
        <div
          key={`battle-participant-${battleParticipant.uuid}`}
          className="flex flex-row space-x-2 items-center pb-2"
        >
          <div className="grow">{battleParticipant.name}</div>
          {[FIELD_NAMES.HP, FIELD_NAMES.INITIATIVE].map((fieldName) => (
            <div
              key={`field-${fieldName}`}
              className="flex-none w-1/4 md:w-1/6"
            >
              <input
                name={generateBattleParticipantInputName(
                  battleParticipant.uuid,
                  fieldName
                )}
                type="number"
                defaultValue={battleParticipant[fieldName] as number}
                className="w-full text-center"
                required
                onClick={(event: SyntheticEvent<HTMLInputElement>) =>
                  event.currentTarget.select()
                }
              />
            </div>
          ))}
          <div className="flex-none text-center">
            <input
              name={generateBattleParticipantInputName(
                battleParticipant.uuid,
                FIELD_NAMES.IS_SURPRISED
              )}
              type="checkbox"
              defaultChecked={battleParticipant.isSurprised}
            />
          </div>
        </div>
      ))}
      <div className="text-right">
        <PrimaryButton submit>Validate</PrimaryButton>
      </div>
    </form>
  );
};
