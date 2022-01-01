import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { DangerButton } from "../button/danger-button";

interface EntityCardProps<T> {
  entity: T;
  onDelete: (entity: T) => void;
  href?: string;
}

export const EntityCard: React.FC<EntityCardProps<any>> = ({
  entity,
  onDelete,
  href,
}) => {
  const router = useRouter();

  const handleCardClick = () => {
    if (href) {
      router.push(href);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="rounded p-4 bg-gray-300 border border-cyan-50"
    >
      <div className="flex flex-row space-x-2 items-center">
        <div className="grow">{entity.name}</div>
        <div className="flex-none w-10">
          <DangerButton onClick={() => onDelete(entity)} withIcon={true}>
            <Image src="/trash-white.svg" width={24} height={24} alt="delete" />
          </DangerButton>
        </div>
      </div>
    </div>
  );
};
