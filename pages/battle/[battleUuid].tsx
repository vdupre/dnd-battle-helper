import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useLocalStorage } from "usehooks-ts";
import { BattleEnemiesSelector } from "../../components/battle/battle-enemies-selector";
import { BattleHeader } from "../../components/battle/battle-header";
import { BattleHeroesSelector } from "../../components/battle/battle-heroes-selector";
import { BattleStarter } from "../../components/battle/battle-starter";
import { Layout } from "../../components/layout";
import {
  addEnemiesToBattle,
  addHeroesToBattle,
  Battle,
  hasAtLeastEnemiesSelectedState,
  hasAtLeastHeroesSelectedState,
  startBattle,
  SURPRISE_ROUND,
} from "../../models/battle";
import { BattleParticipant } from "../../models/battle-participant";
import { generateBattleHomepageUrl } from "../../utils/routing";
import { STORAGE_KEYS } from "../../utils/storage";

const Battle: NextPage = () => {
  const router = useRouter();
  const { battleUuid } = router.query;

  // get available heroes & current battle
  const [heroes] = useLocalStorage<BattleParticipant[]>(
    STORAGE_KEYS.HEROES,
    []
  );
  const [battles, setBattles] = useLocalStorage<Battle[]>(
    STORAGE_KEYS.BATTLES,
    []
  );
  const battle = battles.find((b) => b.uuid === battleUuid);

  // handlers
  const updateBattles = (updatedBattle: Battle, battles: Battle[]) => {
    setBattles([
      updatedBattle,
      ...battles.filter((b) => b.uuid !== updatedBattle.uuid),
    ]);
  };

  const handleHeroesSubmit = (battleHeroes: BattleParticipant[]) => {
    const updatedBattle = addHeroesToBattle(battle as Battle, battleHeroes);
    updateBattles(updatedBattle, battles);
  };

  const handleEnemiesSubmit = (battleEnemies: BattleParticipant[]) => {
    const updatedBattle = addEnemiesToBattle(battle as Battle, battleEnemies);
    updateBattles(updatedBattle, battles);
  };

  const handleBattleStarted = (surpriseRound: SURPRISE_ROUND) => {
    const updatedBattle = startBattle(battle as Battle, surpriseRound);
    updateBattles(updatedBattle, battles);
  };

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
      <section>
        <BattleHeader battle={battle} />
      </section>
      <section>
        <BattleHeroesSelector
          battle={battle}
          heroes={heroes}
          onSubmit={handleHeroesSubmit}
        />
      </section>
      {hasAtLeastHeroesSelectedState(battle) && (
        <section>
          <BattleEnemiesSelector
            battle={battle}
            onSubmit={handleEnemiesSubmit}
          />
        </section>
      )}

      {hasAtLeastEnemiesSelectedState(battle) && (
        <section>
          <BattleStarter
            battle={battle}
            onBattleStarted={handleBattleStarted}
          />
        </section>
      )}
    </Layout>
  );
};

export default Battle;
