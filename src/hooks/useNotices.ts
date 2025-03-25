import { useSelector } from 'react-redux';
import { RootState } from '../store';

export function useNotices(max: number = 1) {
  const notices = useSelector((state: RootState) => state.game.notices);

  return notices.slice(-max);
}
