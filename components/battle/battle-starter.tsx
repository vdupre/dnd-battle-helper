import React, { SyntheticEvent, useRef } from "react";
import { Battle, SURPRISE_ROUND } from "../../models/battle";
import { PrimaryButton } from "../atomic/button/primary-button";

interface BattleStarterProps {
  battle: Battle;
  onBattleStarted: (surpriseRound: SURPRISE_ROUND) => void;
}

export const BattleStarter: React.FC<BattleStarterProps> = ({
  battle,
  onBattleStarted,
}) => {
  const formRef =
    useRef<HTMLFormElement>() as React.MutableRefObject<HTMLFormElement>;

  // handler
  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(formRef.current);
    const surpriseRound = formData.get("surprise") as SURPRISE_ROUND;

    onBattleStarted(surpriseRound);

    alert("to be continued");
  };

  return (
    <div className="bg-gray-200 p-4">
      <h2>Start the battle</h2>
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="mb-4">
          Surprise round?
          <ul className="list-none">
            {Object.values(SURPRISE_ROUND).map((option) => (
              <li className="py-1">
                <label className="block">
                  <input
                    type="radio"
                    name="surprise"
                    defaultChecked={battle.surpriseRound === option}
                    value={option}
                  />{" "}
                  {option.replace("-", " ")}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-center">
          <PrimaryButton submit={true}>Start</PrimaryButton>
        </div>
      </form>
    </div>
  );
};
