import React from "react";
import Head from "next/head";
import Link from "next/link";
import { generateHomepageUrl } from "../../utils/routing";

export const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <Head>
        <title>DnD Battle Helper</title>
        <meta name="description" content="DnD Battle Helper" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-slate-600 text-white p-2 ">
        <h1>
          <Link href={generateHomepageUrl()}>DnD Battle Helper</Link>
        </h1>
      </header>

      <main className="container mx-auto py-4 px-4">{children}</main>
    </div>
  );
};
