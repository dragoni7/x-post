import { BrowserOAuthClient } from '@atproto/oauth-client-browser';
import { Button, Paper, TextField } from '@mui/material';
import React, { useState } from 'react';

export default function Login() {
  const [handle, setHandle] = useState<string>('');

  async function handleLogin(handle: string) {
    console.log(handle);
    const client = await BrowserOAuthClient.load({
      clientId: 'https://x-post-omega.vercel.app/client-metadata.json',
      handleResolver: handle,
    });

    const result = await client.init();

    if (result) {
      console.log(result);
    }
  }
  return (
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'row', gap: 2 }}>
      <TextField
        label="Text"
        variant="outlined"
        value={handle}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setHandle(event.target.value);
        }}
      />
      <Button onClick={() => handleLogin(handle)}>Login</Button>
    </Paper>
  );
}
