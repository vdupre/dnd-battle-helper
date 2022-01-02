import type { NextPage } from "next";
import { useLocalStorage } from "usehooks-ts";
import { BattleList } from "../../components/battle/home/battle-list";
import { CreateBattleForm } from "../../components/battle/home/create-battle-form";
import { Layout } from "../../components/layout";
import { Battle } from "../../models/battle";
import { STORAGE_KEYS } from "../../utils/storage";

const BattleHome: NextPage = () => {
  const [battles, setBattles] = useLocalStorage<Battle[]>(
    STORAGE_KEYS.BATTLES,
    []
  );

  const handleCreate = (newBattle: Battle) => {
    const newList = [...battles, newBattle].sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    setBattles(newList);
  };

  const handleDelete = (deletedBattle: Battle) => {
    const newList = battles.filter(
      (battle) => battle.uuid !== deletedBattle.uuid
    );

    setBattles(newList);
  };

  return (
    <Layout>
      <CreateBattleForm onCreate={handleCreate} />
      <BattleList battles={battles} onDelete={handleDelete} />
    </Layout>
  );
};

export default BattleHome;
