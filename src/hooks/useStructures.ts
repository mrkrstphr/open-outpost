import { useSelector } from 'react-redux';
import type { RootState } from '../store';

export function useStructures() {
  return useSelector((state: RootState) => state.game.structures);
}
