import { Agent, AppBskyActorDefs } from '@atproto/api';
import { BrowserOAuthClient, OAuthSession } from '@atproto/oauth-client-browser';
import React, { createContext, ReactNode, useEffect, useState } from 'react';

type BlueskyContextProps = {
  client?: BrowserOAuthClient;
  session?: OAuthSession;
  agent?: Agent;
  accountProfile?: AppBskyActorDefs.ProfileViewDetailed;
  loading: boolean;
};

export const BlueskyContext = createContext<BlueskyContextProps | null>(null);

export default function BlueskyProvider({ children }: { children: ReactNode }) {
  const [client, setClient] = useState<BrowserOAuthClient>();
  const [session, setSession] = useState<OAuthSession>();
  const [agent, setAgent] = useState<Agent>();
  const [accountProfile, setAccountProfile] = useState<AppBskyActorDefs.ProfileViewDetailed>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function initClientAsync() {
      try {
        const browserOAuthClient = new BrowserOAuthClient({
          clientMetadata: {
            client_id: 'https://x-post-omega.vercel.app/client-metadata.json',
            client_name: 'X-Post',
            client_uri: 'https://x-post-omega.vercel.app',
            logo_uri: 'https://x-post-omega.vercel.app/logo.png',
            tos_uri: 'https://x-post-omega.vercel.app/tos',
            policy_uri: 'https://x-post-omega.vercel.app/policy',
            redirect_uris: ['https://x-post-omega.vercel.app/'],
            scope: 'atproto transition:generic',
            grant_types: ['authorization_code', 'refresh_token'],
            response_types: ['code'],
            token_endpoint_auth_method: 'none',
            application_type: 'web',
            dpop_bound_access_tokens: true,
          },
          handleResolver: 'https://bsky.social',
        });

        const result = await browserOAuthClient.init();
        console.log('client init results:', result);
        setClient(browserOAuthClient);

        if (!!result && 'session' in result) {
          setSession(result.session);
          const blueskyAgent = new Agent(result.session);
          setAgent(blueskyAgent);

          const profile = await blueskyAgent.getProfile({ actor: result.session.sub });
          setAccountProfile(profile.data);
          setLoading(false);
        }
      } catch (err) {
        console.error('Error while initializing bluesky: ', err);
      }
    }

    initClientAsync();
  }, []);

  return (
    <BlueskyContext.Provider value={{ client, session, agent, accountProfile, loading }}>
      {children}
    </BlueskyContext.Provider>
  );
}
