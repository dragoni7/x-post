import useBluesky from '@/lib/atproto/useBluesky';
import { Button, Paper, TextField } from '@mui/material';
import React, { useState } from 'react';

export default function Login() {
  const [handle, setHandle] = useState<string>('');
  const bluesky = useBluesky();

  async function loginUser() {
    if (bluesky?.client) {
      try {
        await bluesky?.client.signIn(handle, {
          signal: new AbortController().signal,
        });
      } catch (err) {
        console.log('The user aborted the authorization process by navigating "back"', err);
      }
    }
  }

  async function createPost() {
    console.log(
      'attempting to create bluesky post with account:',
      bluesky?.accountProfile?.displayName
    );

    if (bluesky?.agent) {
      const result = await bluesky?.agent.post({
        text: 'Hello world! I posted this via the API.',
        createdAt: new Date().toISOString(),
      });

      console.log('Posting result: ', result);
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
      {bluesky?.loading ? (
        <div>loading...</div>
      ) : (
        <div>Logged in as, {bluesky?.accountProfile?.displayName}</div>
      )}
      <Button onClick={loginUser}>Login</Button>
      <Button onClick={createPost}>Create Test Post</Button>
    </Paper>
  );
}
