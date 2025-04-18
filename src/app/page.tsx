'use client';

import Login from '@/features/bluesky/components/login';
import { Container, TextField } from '@mui/material';

export default function Home() {
  return (
    <Container>
      <TextField label="Text" variant="outlined" />
      <Login />
    </Container>
  );
}
