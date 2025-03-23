import { useSelector } from 'react-redux';
import { RootState } from '../store';

export function useStructures() {
  return useSelector((state: RootState) => state.game.buildings);
}
