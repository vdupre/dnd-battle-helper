import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>DnD Battle Helper</title>
        <meta name="description" content="DnD Battle Helper" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto py-4 px-4">
        <h1 className="text-3xl font-bold">DnD Battle Helper</h1>
        <p>
          <select className="px-1 py-1 rounded-md w-3/4">
            <option>test</option>
          </select>
        </p>
      </main>
    </div>
  );
};

export default Home;
