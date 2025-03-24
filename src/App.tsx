import { lazy, Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from './components/Box';
import { Tab } from './components/Tab';
import ResearchPanel from './panels/Research';
import { StructuresPanel } from './panels/Structures';
import { tick } from './state/slices/game';
import { RootState } from './store';

const DebugPanel = lazy(() => import('./panels/Debug/Debug'));

enum Tabs {
  Home,
  Research,
  Debug,
}

function App() {
  const state = useSelector((state: RootState) => state.game);
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState(0);

  const settings = {
    gameSpeed: 5,
  };

  useEffect(() => {
    const tickInterval = 1000 / (settings.gameSpeed * 4);

    const interval = setInterval(() => dispatch(tick()), tickInterval);

    return () => clearInterval(interval);
  }, [settings.gameSpeed]);

  return (
    <div className="lg:w-2/3 w-full mx-auto p-4 text-white">
      <h1 className="text-4xl text-stone-200 mb-4" style={{ fontFamily: 'TechnoRace' }}>
        OpenOutpost
      </h1>

      <Box className="mb-1">
        <Box className="flex items-center mb-1">
          <div className="flex space-x-1 flex-1">
            <Tab active={activeTab === Tabs.Home} onClick={() => setActiveTab(Tabs.Home)}>
              Home
            </Tab>
            <Tab active={activeTab === Tabs.Research} onClick={() => setActiveTab(Tabs.Research)}>
              Research
            </Tab>
            <Tab active={activeTab === Tabs.Debug} onClick={() => setActiveTab(Tabs.Debug)}>
              Debug
            </Tab>
          </div>
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

        <Suspense>
          {activeTab === Tabs.Home && <StructuresPanel />}
          {activeTab === Tabs.Research && <ResearchPanel />}
          {activeTab === Tabs.Debug && <DebugPanel />}
        </Suspense>
      </Box>
    </div>
  );
}

export default App;
