import type { NextPage } from "next";
import { Layout } from "../components/layout";
import { Nav } from "../components/layout/nav";

const Home: NextPage = () => {
  return (
    <Layout>
      <Nav />
    </Layout>
  );
};

export default Home;
