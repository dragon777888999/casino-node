// lib/metadata.ts
import { Metadata } from 'next';
import { headers } from 'next/headers';

export async function generateMetadata(): Promise<Metadata> {
  const headersList = headers();
  const host = headersList.get('origin') || '';

  let title = 'RebelGames by SunRebels on XRP';
  let description = 'The #1 gaming platform on the XRPL, with rev share to SunRebels holders!';

  if (host.includes('rebelgames.io')) {
    title = 'RebelGames by SunRebels on XRP';
    description = 'The #1 gaming platform on the XRPL, with rev share to SunRebels holders!';
  } else if (host.includes('play.k9casino.io')) {
    title = 'K9 Casino';
    description = 'Exciting new gaming platform with rewards back to K9 holders, unleash your luck today!';
  } else if (host.includes('tronquest.com')) {
    title = 'Epic Play to Earn Experience';
    description = 'Epic Play to Earn Experience on Tron';
  }

  return {
    title,
    description,
  };
}
