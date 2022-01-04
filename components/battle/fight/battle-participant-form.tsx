import React, { useRef } from "react";
import {
  BattleParticipant,
  CONDITIONS,
} from "../../../models/battle-participant";
import { PrimaryButton } from "../../atomic/button/primary-button";

interface BattleParticipantFormProps {
  battleParticipant: BattleParticipant;
}

export const BattleParticipantForm: React.FC<BattleParticipantFormProps> = ({
  battleParticipant,
}) => {
  const formRef =
    useRef<HTMLFormElement>() as React.MutableRefObject<HTMLFormElement>;

  // handlers
  const onHpChanged = () => {};

  return (
    <div className="border p-2 rounded-md">
      <div className="mb-2">
        <div className="flex flex-row space-x-2 items-center">
          <h2 className="p-0">{battleParticipant.name}</h2>
          <div>
            HP: {battleParticipant.hp} / {battleParticipant.maxHp}
          </div>
        </div>
      </div>
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

        {/* conditions */}
        <div className="mb-2">
          <div>conditions</div>
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
        </div>
        <div className="text-right">
          <PrimaryButton submit>Validate</PrimaryButton>
        </div>
      </form>
    </div>
  );
};
