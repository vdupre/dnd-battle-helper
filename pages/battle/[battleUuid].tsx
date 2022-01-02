import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useLocalStorage } from "usehooks-ts";
import { BattleEnemiesSelector } from "../../components/battle/battle-enemies-selector";
import { BattleHeader } from "../../components/battle/battle-header";
import { BattleHeroesSelector } from "../../components/battle/battle-heroes-selector";
import { Layout } from "../../components/layout";
import { addHeroesToBattle, Battle } from "../../models/battle";
import { BattleParticipant } from "../../models/battle-participant";
import { generateBattleHomepageUrl } from "../../utils/routing";
import { STORAGE_KEYS } from "../../utils/storage";

const Battle: NextPage = () => {
  const router = useRouter();
  const { battleUuid } = router.query;

  // get available heroes
  const [heroes] = useLocalStorage<BattleParticipant[]>(
    STORAGE_KEYS.HEROES,
    []
  );

  // get current battle
  const [battles, setBattles] = useLocalStorage<Battle[]>(
    STORAGE_KEYS.BATTLES,
    []
  );
  const battle = battles.find((b) => b.uuid === battleUuid);

  // handlers
  const handleHeroesSubmit = (battleHeroes: BattleParticipant[]) => {
    const updatedBattle = addHeroesToBattle(battle as Battle, battleHeroes);

    setBattles([
      updatedBattle,
      ...battles.filter((b) => b.uuid !== updatedBattle.uuid),
    ]);
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
      <section>
        <BattleEnemiesSelector battle={battle} />
      </section>
    </Layout>
  );
};

export default Battle;
