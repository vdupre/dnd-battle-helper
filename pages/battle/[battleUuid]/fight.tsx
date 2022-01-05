import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useLocalStorage } from "usehooks-ts";
import { BattleHeader } from "../../../components/battle/battle-header";
import { RoundOrder } from "../../../components/battle/battle-header/round-order";
import { BattleParticipantForm } from "../../../components/battle/fight/battle-participant-form";
import { CurrentParticipant } from "../../../components/battle/fight/current-participant";
import { NextParticipants } from "../../../components/battle/fight/next-participants";
import { Layout } from "../../../components/layout";
import {
  Battle,
  getParticipantsSortedByInitiative,
} from "../../../models/battle";
import { generateBattleHomepageUrl } from "../../../utils/routing";
import { STORAGE_KEYS } from "../../../utils/storage";

const Battle: NextPage = () => {
  const router = useRouter();
  const { battleUuid } = router.query;

  // get current battle & current participant
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

  const sortedBattleParticipants = getParticipantsSortedByInitiative(battle);
  const curentBattleParticipant = sortedBattleParticipants[battle.turn - 1];
  const nextBattleParticipants = sortedBattleParticipants.splice(1);

  return (
    <Layout>
      <section>
        <BattleHeader displayRoundOrder battle={battle} />
      </section>
      <section>
        <CurrentParticipant battleParticipant={curentBattleParticipant} />
      </section>
      <section>
        <NextParticipants battleParticipants={nextBattleParticipants} />
      </section>
    </Layout>
  );
};

export default Battle;
