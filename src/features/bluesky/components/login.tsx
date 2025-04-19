import { useBluesky } from '@/lib/atproto/useBluesky';
import { Button, Paper, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';

export default function Login() {
  const [handle, setHandle] = useState<string>('');
  const { agent, loginUser } = useBluesky();

  useEffect(() => {
    async function testProfile() {
      if (agent) return await agent.getProfile({ actor: agent.assertDid });
    }

    const response = testProfile();
    console.log(response);
  }, [agent]);

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
      <Button onClick={() => loginUser(handle)}>Login</Button>
    </Paper>
  );
}
