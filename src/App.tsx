import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useSound from 'use-sound';
import { Box } from './components/Box';
import { useNotices } from './hooks/useNotices';
import { DebugTrigger } from './panels/Debug/Trigger';
import { StructuresPanel } from './panels/Structures';
import alertSfx from './sound/alert.mp3';
import { tick } from './state/slices/game';
import type { RootState } from './store';

function App() {
  const state = useSelector((state: RootState) => state.game);
  const [latestNotice] = useNotices(1);
  const dispatch = useDispatch();
  const [play] = useSound(alertSfx, { volume: 0.25 });

  const settings = {
    gameSpeed: 5,
  };

  useEffect(() => {
    if (latestNotice) {
      play();
    }
  }, [latestNotice, play]);

  useEffect(() => {
    const tickInterval = 1000 / (settings.gameSpeed * 4);

    const interval = setInterval(() => dispatch(tick()), tickInterval);

    return () => clearInterval(interval);
  }, [dispatch, settings.gameSpeed]);

  return (
    <>
      <div className="lg:w-2/3 w-full mx-auto p-4 text-white">
        <div className="flex space-x-2 items-center mb-4">
          <h1 className="text-4xl text-stone-200 flex-1" style={{ fontFamily: 'TechnoRace' }}>
            OpenOutpost
          </h1>
          <div>
            <DebugTrigger />
          </div>
        </div>

        <Box className="mb-1">
          <Box className="flex items-center mb-1">
            <div className="justify-self-end text-white mr-1">
              Mark: <span className="bg-purple-400 text-sm py-0.5 px-1">{state.mark}</span>
              <span className="text-purple-400"> | </span> Common:{' '}
              <span className="bg-orange-500 text-sm py-0.5 px-1">{state.ore.common}</span>
              <span className="text-purple-400"> | </span> Rare:{' '}
              <span className="bg-yellow-500 text-sm py-0.5 px-1">{state.ore.rare}</span>
              <span className="text-purple-400"> | </span> Moral:{' '}
              <span className="bg-blue-400 text-sm py-0.5 px-1">{state.morale}</span>
            </div>
          </Box>

          <StructuresPanel />

          <Box className="mt-1 text-sm">
            {latestNotice ? (
              <>
                @{latestNotice?.mark}: {latestNotice?.message}
              </>
            ) : (
              <>&nbsp;</>
            )}
          </Box>
        </Box>
      </div>
    </>
  );
}

export default App;
