import { useBluesky } from '@/lib/atproto/useBluesky';
import { Button, Paper, TextField } from '@mui/material';
import React, { useState } from 'react';

export default function Login() {
  const [handle, setHandle] = useState<string>('');
  const bluesky = useBluesky();

  async function handleLogin() {
    if (bluesky) {
      try {
        await bluesky.signIn(handle, {
          signal: new AbortController().signal,
        });

        console.log('Never executed');
      } catch (err) {
        console.log('The user aborted the authorization process by navigating "back"');
      }
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
      <Button onClick={handleLogin}>Login</Button>
    </Paper>
  );
}
