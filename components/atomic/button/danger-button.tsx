import React from "react";

interface DangerButtonInput {
  onClick: () => void;
  withIcon?: boolean;
}

export const DangerButton: React.FC<DangerButtonInput> = ({
  onClick,
  children,
  withIcon = false,
}) => {
  const handleClick = (e: React.SyntheticEvent) => {
    e.preventDefault();

    onClick();
  };

  return (
    <button
      onClick={handleClick}
      className={`bg-red-500 hover:bg-red-600 text-white font-bold rounded ${
        withIcon ? "p-1 leading-none" : "py-2 px-4"
      }`}
    >
      {children}
    </button>
  );
};
