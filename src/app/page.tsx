'use client';

import Login from '@/features/bluesky/components/login';
import BlueskyProvider from '@/lib/atproto/BlueskyProvider';
import { Container } from '@mui/material';

export default function Home() {
  return (
    <BlueskyProvider>
      <Container>
        <Login />
      </Container>
    </BlueskyProvider>
  );
}
