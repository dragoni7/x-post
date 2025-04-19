import { Agent } from '@atproto/api';
import { BrowserOAuthClient, OAuthSession } from '@atproto/oauth-client-browser';
import { useEffect, useRef, useState } from 'react';

function resultHasState(
  result: { session: OAuthSession; state: string | null } | { session: OAuthSession } | undefined
): result is { session: OAuthSession; state: string | null } {
  if (result === undefined) return false;
  // @ts-expect-error state should exist here
  return result.state !== undefined;
}

export function useBluesky() {
  const [agent, setAgent] = useState<Agent>();
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const client = useRef<BrowserOAuthClient>(undefined);

  async function initClient() {
    try {
      const newClient = await BrowserOAuthClient.load({
        clientId: 'https://x-post-omega.vercel.app/client-metadata.json',
        handleResolver: 'https://bsky.social',
      });

      const result = await newClient.init();
      client.current = newClient;
      return result;
    } catch (err) {
      console.error(err);
    }
  }

  async function loginUser(handle: string) {
    if (client.current) {
      try {
        await client.current.signIn(handle, {
          signal: new AbortController().signal,
        });
      } catch (err) {
        console.log('The user aborted the authorization process by navigating "back"', err);
      }
    }
  }

  useEffect(() => {
    initClient().then(async (result) => {
      if (!result) return;

      if (resultHasState(result) && result.state !== null) {
        console.log(
          `${result.session.sub} was successfully authenticated (state: ${result.state})`
        );
      } else {
        console.log(`${result.session.sub} was restored (last active session)`);
      }

      setAgent(new Agent(result.session));
      setAuthenticated(true);
    });
  }, []);

  return { agent, authenticated, loginUser };
}
