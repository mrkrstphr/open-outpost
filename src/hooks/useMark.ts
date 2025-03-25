import { useSelector } from 'react-redux';
import type { RootState } from '../store';

export function useMark() {
  return useSelector((state: RootState) => state.game.mark);
}
