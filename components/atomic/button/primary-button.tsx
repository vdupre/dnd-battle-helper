import { useRouter } from "next/router";
import React from "react";

interface PrimaryButtonProps {
  href?: string;
  onClick?: () => void;
  submit?: boolean;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  href,
  onClick,
  children,
  submit = false,
}) => {
  const router = useRouter();
  const classNames =
    "bg-slate-500 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded";

  const handleClick = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (href) {
      router.push(href);
    } else if (onClick) {
      onClick();
    }
  };

  return submit ? (
    <input type="submit" className={classNames} value={children as string} />
  ) : (
    <button onClick={handleClick} className={classNames}>
      {children}
    </button>
  );
};
