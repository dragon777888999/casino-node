//"use client";
import Main from "@/components/main/page";


import { Metadata } from 'next';
import { headers } from 'next/headers';

export async function generateMetadata(): Promise<Metadata> {
  const headersList = headers();
  const host = headersList.get('host') || '';

  console.log("***************", host);

  let title = 'Epic Play to Earn Experience';
  let description = 'Epic Play to Earn Experience on Solana, Xrpl, Tron, Oraichain ...';

  if (host.includes('rebelgames.io')) {
    title = 'RebelGames by SunRebels on XRP';
    description = 'The #1 gaming platform on the XRPL, with rev share to SunRebels holders!';
  } else if (host.includes('example2.com')) {
    title = 'Example 2 Title';
    description = 'This is a description for Example 2';
  }

  return {
    title,
    description,
  };
}

export default function Home() {
  return (
    <Main />
  );
}
