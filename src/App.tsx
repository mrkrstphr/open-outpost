import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router';
import useSound from 'use-sound';
import { Box } from './components/Box';
import { DebugTrigger } from './components/Debug/Trigger';
import { useNotices } from './hooks/useNotices';
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
          <div className="flex space-x-1 items-center">
            <DebugTrigger />
          </div>
        </div>

        <Box className="flex flex-col space-y-1 text-sm">
          <Outlet />

          <Box className="mb-1 text-sm truncate">
            {latestNotice ? (
              <>
                @{latestNotice?.mark}: {latestNotice?.message}
              </>
            ) : (
              <>&nbsp;</>
            )}
          </Box>
          <Box className="flex items-center space-x-1">
            <Box className="text-sm flex flex-1 items-center space-x-1">
              <span className="flex-1">Common:</span> <span>{state.ore.common}</span>
            </Box>
            <Box className="text-sm flex flex-1 items-center space-x-1">
              <span className="flex-1">Rare:</span> <span>{state.ore.rare}</span>
            </Box>
          </Box>
        </Box>
      </div>
    </>
  );
}

export default App;
