import React, { useRef } from "react";
import { Battle, createBattleFromName } from "../../../models/battle";
import { PrimaryButton } from "../../atomic/button/primary-button";

interface BattleFormProps {
  onCreate: (newBattle: Battle) => void;
}

export const CreateBattleForm: React.FC<BattleFormProps> = ({ onCreate }) => {
  const namePropsRef =
    useRef<HTMLInputElement>() as React.MutableRefObject<HTMLInputElement>;

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
    onCreate(createBattleFromName(name));
  };

  return (
    <form className="pb-4">
      <h2>Create a new battle</h2>
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
