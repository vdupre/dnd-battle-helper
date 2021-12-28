import type { NextPage } from "next";
import { useLocalStorage } from "usehooks-ts";
import { CreateHeroForm } from "../components/hero/create-hero-form";
import { HeroList } from "../components/hero/hero-list";
import { Layout } from "../components/layout";
import { Hero } from "../models/hero";
import { STORAGE_KEYS } from "../utils/storage";

const Home: NextPage = () => {
  const [heroes, setHeroes] = useLocalStorage<Hero[]>(STORAGE_KEYS.HEROES, []);

  const handleCreate = (newHero: Hero) => {
    const newList = [...heroes, newHero].sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    setHeroes(newList);
  };

  const handleDelete = (deletedHero: Hero) => {
    const newList = heroes.filter((hero) => hero.uuid !== deletedHero.uuid);

    setHeroes(newList);
  };

  return (
    <Layout>
      <CreateHeroForm onCreate={handleCreate} />
      <HeroList heroes={heroes} onDelete={handleDelete} />
    </Layout>
  );
};

export default Home;
