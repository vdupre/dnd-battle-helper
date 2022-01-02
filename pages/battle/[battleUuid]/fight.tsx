import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useLocalStorage } from "usehooks-ts";
import { BattleHeader } from "../../../components/battle/battle-header";
import { Layout } from "../../../components/layout";
import { Battle } from "../../../models/battle";
import { generateBattleHomepageUrl } from "../../../utils/routing";
import { STORAGE_KEYS } from "../../../utils/storage";

const Battle: NextPage = () => {
  const router = useRouter();
  const { battleUuid } = router.query;

  // get available heroes & current battle
  const [battles] = useLocalStorage<Battle[]>(STORAGE_KEYS.BATTLES, []);
  const battle = battles.find((b) => b.uuid === battleUuid);

  // security: if not found, redirect to battle homepage
  if (!battle) {
    // on client side, redirect to the battle homepage
    if (router.isReady) {
      router.push(generateBattleHomepageUrl());
    }
    return null;
  }

  return (
    <Layout>
      <BattleHeader battle={battle} />
    </Layout>
  );
};

export default Battle;
