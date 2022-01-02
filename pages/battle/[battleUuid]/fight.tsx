import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useLocalStorage } from "usehooks-ts";
import { PrimaryButton } from "../../../components/atomic/button/primary-button";
import { BattleEnemiesSelector } from "../../../components/battle/battle-enemies-selector";
import { BattleHeader } from "../../../components/battle/battle-header";
import { BattleHeroesSelector } from "../../../components/battle/battle-heroes-selector";
import { BattleStarter } from "../../../components/battle/battle-starter";
import { Layout } from "../../../components/layout";
import {
  addEnemiesToBattle,
  addHeroesToBattle,
  Battle,
  hasAtLeastEnemiesSelectedState,
  hasAtLeastHeroesSelectedState,
  startBattle,
} from "../../../models/battle";
import { BattleParticipant } from "../../../models/battle-participant";
import {
  generateBattleFightUrl,
  generateBattleHomepageUrl,
} from "../../../utils/routing";
import { STORAGE_KEYS } from "../../../utils/storage";

const Battle: NextPage = () => {
  const router = useRouter();
  const { battleUuid } = router.query;

  // get available heroes & current battle
  const [battles, setBattles] = useLocalStorage<Battle[]>(
    STORAGE_KEYS.BATTLES,
    []
  );
  const battle = battles.find((b) => b.uuid === battleUuid);

  // security: if not found, redirect to battle homepage
  if (!battle) {
    // on client side, redirect to the battle homepage
    if (router.isReady) {
      router.push(generateBattleHomepageUrl());
    }
    return null;
  }

  return <Layout>To be continued</Layout>;
};

export default Battle;
