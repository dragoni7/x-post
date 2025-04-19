import { useBluesky } from '@/lib/atproto/useBluesky';
import { Button, Paper, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';

export default function Login() {
  const [handle, setHandle] = useState<string>('');
  const { agent, loginUser } = useBluesky();

  useEffect(() => {
    async function testProfile() {
      let profile;

      if (agent) {
        profile = await agent.com.atproto.repo.getRecord({
          repo: agent.assertDid, // The user
          collection: 'app.bsky.actor.profile', // The collection
          rkey: 'self', // The record key
        });

        // post
        const postResult = await agent.post({
          text: 'Hello world! I posted this via the API.',
          createdAt: new Date().toISOString(),
        });

        console.log('Created post: ', postResult);
      }

      return profile;
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
