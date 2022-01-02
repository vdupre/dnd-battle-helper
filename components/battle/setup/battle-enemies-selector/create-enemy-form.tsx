import React, { useRef } from "react";
import { PrimaryButton } from "../../../atomic/button/primary-button";

interface CreateEnemyFormProps {
  onCreate: (name: string) => void;
}

export const CreateEnemyForm: React.FC<CreateEnemyFormProps> = ({
  onCreate,
}) => {
  const inputRef =
    useRef<HTMLInputElement>() as React.MutableRefObject<HTMLInputElement>;

  const handleCreateClick = () => {
    const input = inputRef.current as HTMLInputElement;
    const name = input.value;

    // security: mandatory field
    if (!name) {
      return;
    }

    // reset field
    input.value = "";

    // submit new enemy
    onCreate(name);
  };

  return (
    <form className="pb-4">
      <h2>Create a new enemy</h2>
      <div className="flex flex-row space-x-2">
        <input
          type="text"
          className="grow rounded-md"
          placeholder="name"
          ref={inputRef}
        />
        <div className="flex-none">
          <PrimaryButton onClick={handleCreateClick}>Create</PrimaryButton>
        </div>
      </div>
    </form>
  );
};
