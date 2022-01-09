import Image from "next/image";
import React, { SyntheticEvent, useRef, useState } from "react";
import {
  BattleParticipant,
  isEnemy,
  // CONDITIONS,
  updateBattleParticipantHp,
} from "../../../models/battle-participant";
import { PrimaryButton } from "../../atomic/button/primary-button";

interface BattleParticipantFormProps {
  battleParticipant: BattleParticipant;
  formDisplayed?: boolean;
  onBattleParticipantUpdated: (battleParticipant: BattleParticipant) => void;
}

export const BattleParticipantForm: React.FC<BattleParticipantFormProps> = ({
  battleParticipant,
  onBattleParticipantUpdated,
}) => {
  const formRef =
    useRef<HTMLFormElement>() as React.MutableRefObject<HTMLFormElement>;
  const damageInputRef =
    useRef<HTMLInputElement>() as React.MutableRefObject<HTMLInputElement>;
  const healingInputRef =
    useRef<HTMLInputElement>() as React.MutableRefObject<HTMLInputElement>;

  // states
  const [isFormDisplayed, setIsFormDisplayed] = useState<boolean>(false);
  // const [areConditionsDisplayed, setAreConditionsDisplayed] =
  //   useState<boolean>(false);

  // handlers
  const handleParticipantInfoClicked = () =>
    setIsFormDisplayed(!isFormDisplayed);
  // const handleConditionsHeaderClicked = () =>
  //   setAreConditionsDisplayed(!areConditionsDisplayed);

  const resetHealingField = () => (healingInputRef.current.value = "");
  const resetDamageField = () => (damageInputRef.current.value = "");

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(formRef.current);

    const damage = +(formData.get("damage") as string);
    const healing = +(formData.get("healing") as string);

    if (damage > 0 || healing > 0) {
      const updatedBattleParticipant = updateBattleParticipantHp(
        battleParticipant,
        damage,
        healing
      );

      resetHealingField();
      resetDamageField();

      onBattleParticipantUpdated(updatedBattleParticipant);
    }
  };

  return (
    <div className="border p-2 rounded-md">
      <div className="mb-2">
        <div
          className="flex flex-row justify-between items-center cursor-pointer"
          onClick={handleParticipantInfoClicked}
        >
          <div className="font-semibold text-lg p-0">
            {battleParticipant.name}
          </div>
          <div
            className={
              isEnemy(battleParticipant) ? "blur-sm hover:blur-none" : ""
            }
          >
            HP: {battleParticipant.hp} / {battleParticipant.maxHp}
          </div>
        </div>
      </div>
      {isFormDisplayed && (
        <form ref={formRef} onSubmit={handleSubmit}>
          {/* damage & healing */}
          <div className="mb-2">
            <div className="flex flex-row items-center">
              <Image src="/battle.svg" width={24} height={24} alt="damage" />
              <div className="w-20 mx-2">
                <input
                  ref={damageInputRef}
                  type="number"
                  name="damage"
                  className="w-full rounded-md"
                  min={0}
                  onChange={resetHealingField}
                />
              </div>
              <Image src="/health.svg" width={24} height={24} alt="healing" />
              <div className="w-20 ml-2 mr-6">
                <input
                  ref={healingInputRef}
                  type="number"
                  name="healing"
                  className="w-full rounded-md"
                  min={0}
                  disabled={battleParticipant.maxHp === battleParticipant.hp}
                  onChange={resetDamageField}
                />
              </div>
              <PrimaryButton submit>Validate</PrimaryButton>
            </div>
          </div>

          {/* conditions */}
          {/* <div className="mb-2">
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
          </div> */}
        </form>
      )}
    </div>
  );
};
