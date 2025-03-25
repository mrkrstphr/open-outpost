import { useSelector } from 'react-redux';
import { ContentBox } from '../../components/ContentBox';
import type { RootState } from '../../store';

export default function DebugPanel() {
  const state = useSelector((state: RootState) => state.game);

  return (
    <ContentBox title="Debug">
      <pre className="text-xs text-green-400 whitespace-pre-wrap">{JSON.stringify(state, null, 2)}</pre>
    </ContentBox>
  );
}
