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
  getParticipantCount,
  getParticipantsSortedByInitiative,
} from "../../../models/battle";
import { generateBattleHomepageUrl } from "../../../utils/routing";
import { STORAGE_KEYS } from "../../../utils/storage";

const Battle: NextPage = () => {
  const router = useRouter();
  const { battleUuid } = router.query;

  // get current battle & current participant
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

  const sortedParticipants = getParticipantsSortedByInitiative(battle);
  const currentParticipant = sortedParticipants[battle.turn - 1];

  const nextParticipants = [];
  for (let i = battle.turn; i < getParticipantCount(battle); i++) {
    nextParticipants.push(sortedParticipants[i]);
  }
  for (let i = 0; i < battle.turn - 1; i++) {
    nextParticipants.push(sortedParticipants[i]);
  }

  // const nextParticipants = sortedParticipants.filter(
  //   (b) => b.uuid !== currentParticipant.uuid
  // );

  // handlers
  const handleTurnEnded = (updatedBattle: Battle) => {
    setBattles([
      updatedBattle,
      ...battles.filter((b) => b.uuid !== updatedBattle.uuid),
    ]);
  };

  return (
    <Layout>
      <section>
        <BattleHeader displayRoundOrder battle={battle} />
      </section>
      <section>
        <CurrentParticipant
          battle={battle}
          battleParticipant={currentParticipant}
          onTurnEnded={handleTurnEnded}
        />
      </section>
      <section>
        <NextParticipants battleParticipants={nextParticipants} />
      </section>
    </Layout>
  );
};

export default Battle;
