import React from "react";
import {
  generateBattleHomepageUrl,
  generateHeroesUrl,
} from "../../utils/routing";
import { PrimaryButton } from "../atomic/button/primary-button";

export const Nav: React.FC = () => {
  return (
    <div className="text-center mt-16">
      <PrimaryButton href={generateHeroesUrl()}>Manage heroes</PrimaryButton>
      <div className="italic my-2">or</div>
      <PrimaryButton href={generateBattleHomepageUrl()}>
        Manage battles
      </PrimaryButton>
    </div>
  );
};
