import { useSelector } from 'react-redux';
import type { RootState } from '../store';

export function useNotices(max?: number) {
  const notices = useSelector((state: RootState) => state.game.notices);

  return max ? notices.slice(-max) : notices;
}
