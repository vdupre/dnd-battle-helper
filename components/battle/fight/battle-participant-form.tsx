import React, { useRef, useState } from "react";
import {
  BattleParticipant,
  CONDITIONS,
} from "../../../models/battle-participant";
import { PrimaryButton } from "../../atomic/button/primary-button";

interface BattleParticipantFormProps {
  battleParticipant: BattleParticipant;
  formDisplayed?: boolean;
}

export const BattleParticipantForm: React.FC<BattleParticipantFormProps> = ({
  battleParticipant,
  formDisplayed = false,
}) => {
  const formRef =
    useRef<HTMLFormElement>() as React.MutableRefObject<HTMLFormElement>;

  // states
  const [isFormDisplayed, setIsFormDisplayed] =
    useState<boolean>(formDisplayed);
  const [areConditionsDisplayed, setAreConditionsDisplayed] =
    useState<boolean>(false);

  // handlers
  const handleParticipantInfoClicked = () =>
    setIsFormDisplayed(!isFormDisplayed);
  const handleConditionsHeaderClicked = () =>
    setAreConditionsDisplayed(!areConditionsDisplayed);

  return (
    <div className="border p-2 rounded-md">
      <div className="mb-2">
        <div
          className="flex flex-row space-x-2 items-center cursor-pointer"
          onClick={handleParticipantInfoClicked}
        >
          <div className="font-semibold text-lg p-0">
            {battleParticipant.name}
          </div>
          <div>
            HP: {battleParticipant.hp} / {battleParticipant.maxHp}
          </div>
        </div>
      </div>
      {isFormDisplayed && (
        <form ref={formRef}>
          {/* damage & healing */}
          <div className="mb-2">
            <div className="flex flex-row items-center">
              <div className="w-28">damage</div>
              <div className="w-28">healing</div>
            </div>
            <div className="flex flex-row items-center">
              <div className="w-28 pr-2">
                <input
                  type="number"
                  name="damage"
                  className="w-full rounded-md"
                />
              </div>
              <div className="w-28 pr-2">
                <input
                  type="number"
                  name="healing"
                  className="w-full rounded-md"
                />
              </div>
            </div>
          </div>

          {/* concentration */}
          <div className="mb-2">
            <label className="py-1 block">
              <input type="checkbox" name="condition" className="mr-2" />
              is maintaining concentration
            </label>
          </div>

          {/* conditions */}
          <div className="mb-2">
            <div
              className="cursor-pointer"
              onClick={handleConditionsHeaderClicked}
            >
              conditions {!areConditionsDisplayed && <span>⬇️</span>}
            </div>
            {areConditionsDisplayed && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {Object.values(CONDITIONS).map((condition) => (
                  <div key={`condition-${condition}`}>
                    <label className="py-1 block">
                      <input
                        type="checkbox"
                        name="condition"
                        value={condition}
                        className="mr-2"
                      />
                      {condition}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="text-right">
            <PrimaryButton submit>Validate</PrimaryButton>
          </div>
        </form>
      )}
    </div>
  );
};
