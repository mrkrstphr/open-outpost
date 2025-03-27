import { useSelector } from 'react-redux';
import { Button } from '../../components/Button';
import { ContentBox } from '../../components/ContentBox';
import type { RootState } from '../../store';

export default function DebugPanel({ onClose }: { onClose: () => void }) {
  const state = useSelector((state: RootState) => state.game);

  return (
    <ContentBox
      action={<Button onClick={onClose}>Close</Button>}
      title="Debug"
      className="absolute bg-stone-900 inset-4 md:inset-1/4 lg:w-1/2 lg:top-16 z-50"
      classNames={{ body: 'overflow-auto' }}
    >
      <pre className="text-xs text-green-400 whitespace-pre-wrap">{JSON.stringify(state, null, 2)}</pre>
    </ContentBox>
  );
}
