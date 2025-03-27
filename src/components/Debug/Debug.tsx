import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Button } from '../../components/Button';
import { ContentBox } from '../../components/ContentBox';
import { newGame } from '../../state/slices/game';
import type { RootState } from '../../store';

export default function DebugPanel({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();
  const state = useSelector((state: RootState) => state.game);
  const dispatch = useDispatch();

  const handleRestartGame = () => {
    dispatch(newGame());
    navigate('/');
  };

  return (
    <ContentBox
      action={
        <div className="flex space-x-1">
          <Button onClick={handleRestartGame}>Restart Game</Button>
          <Button onClick={onClose}>Close</Button>
        </div>
      }
      title="Debug"
      className="absolute bg-stone-900 inset-4 md:inset-1/4 lg:w-1/2 lg:top-16 z-50"
      classNames={{ body: 'overflow-auto' }}
    >
      <pre className="text-xs text-green-400 whitespace-pre-wrap">{JSON.stringify(state, null, 2)}</pre>
    </ContentBox>
  );
}
