import { useContext } from 'react';
import { BlueskyContext } from './BlueskyProvider';

export default function useBluesky() {
  const bluesky = useContext(BlueskyContext);

  if (!bluesky) console.error('Missing bluesky context!');

  return bluesky;
}
