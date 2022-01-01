import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useLocalStorage } from "usehooks-ts";
import { BattleHeader } from "../../components/battle/battle-header";
import { BattleHeroesSelector } from "../../components/battle/battle-heroes-selector";
import { Layout } from "../../components/layout";
import { addHeroesToBattle, Battle } from "../../models/battle";
import { BattleHero, Hero } from "../../models/hero";
import { generateBattleHomepageUrl } from "../../utils/routing";
import { STORAGE_KEYS } from "../../utils/storage";

const Battle: NextPage = () => {
  const router = useRouter();
  const { battleUuid } = router.query;

  // get available heroes
  const [heroes] = useLocalStorage<Hero[]>(STORAGE_KEYS.HEROES, []);

  // get current battle
  const [battles, setBattles] = useLocalStorage<Battle[]>(
    STORAGE_KEYS.BATTLES,
    []
  );
  const battle = battles.find((b) => b.uuid === battleUuid);

  // handlers
  const handleHeroesSubmit = (battleHeroes: BattleHero[]) => {
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
      <BattleHeader battle={battle} />
      <BattleHeroesSelector
        battle={battle}
        heroes={heroes}
        onSubmit={handleHeroesSubmit}
      />
    </Layout>
  );
};

export default Battle;
