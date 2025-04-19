import { BrowserOAuthClient } from '@atproto/oauth-client-browser';
import { useEffect, useRef } from 'react';

async function init() {
  try {
    const client = await BrowserOAuthClient.load({
      clientId: 'https://x-post-omega.vercel.app/client-metadata.json',
      handleResolver: 'https://bsky.social/',
    });

    const result = await client.init();
    console.log(result);
    return client;
  } catch (err) {
    console.error(err);
  }
}

export function useBluesky() {
  const client = useRef<BrowserOAuthClient>(undefined);

  useEffect(() => {
    init().then((result) => {
      if (result) client.current = result;
    });
  }, []);

  return client.current;
}
