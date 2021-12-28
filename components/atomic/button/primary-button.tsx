import { useRouter } from "next/router";
import React from "react";

interface PrimaryButtonInput {
  href?: string;
  onClick?: () => void;
}

export const PrimaryButton: React.FC<PrimaryButtonInput> = ({
  href,
  onClick,
  children,
}) => {
  const router = useRouter();

  const handleClick = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (href) {
      router.push(href);
    } else if (onClick) {
      onClick();
    } else {
      throw new Error("primary button must have a href or a onClick attribute");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="bg-slate-500 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded"
    >
      {children}
    </button>
  );
};
