import { BrowserOAuthClient } from '@atproto/oauth-client-browser';
import { Button } from '@mui/material';
import React from 'react';

export default function Login() {
  async function handleLogin() {
    const client = await BrowserOAuthClient.load({
      clientId: 'https://x-post-omega.vercel.app/client-metadata.json',
      handleResolver: 'bsky.social',
    });

    const result = await client.init();

    if (result) {
      console.log(result);
    }
  }
  return <Button onClick={handleLogin}>Login</Button>;
}
