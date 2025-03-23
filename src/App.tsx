import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Content } from './components/Content';
import { Tab } from './components/Tab';
import ResearchPanel from './panels/Research';
import { StructuresPanel } from './panels/Structures';
import { RootState, tick } from './store';

enum Tabs {
  Home,
  Research,
  Structures,
  Debug,
}

function HomePanel() {
  return <Content title="Home">Hello, World.</Content>;
}

function DebugPanel() {
  const state = useSelector((state: RootState) => state.game);

  return (
    <Content title="Debug">
      <div>Game State:</div>
      <pre className="mt-1 border border-purple-400 p-1 text-xs text-green-400 whitespace-pre-wrap">
        {JSON.stringify(state, null, 2)}
      </pre>
      <div>
        Current Research Topic: {state.currentResearchTopic?.topic ?? 'None'}
        <br />
        Counter: {state.currentResearchTopic?.counter ?? '0'}
        <br />
        Duration: {state.currentResearchTopic?.cost}
        <br />
        {/* Elapsed: {state.currentResearchTopic && Date.now() - state.currentResearchTopic.started} */}
      </div>
    </Content>
  );
}

function App() {
  const state = useSelector((state: RootState) => state.game);
  const structures = useSelector((state: RootState) => state.game.buildings);
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
    <div className="lg:w-2/3 w-full mx-auto p-4">
      <h1 className="text-4xl text-stone-200 mb-4" style={{ fontFamily: 'TechnoRace' }}>
        OpenOutpost
      </h1>

      <div className="border border-purple-400 mb-1">
        <div className="border border-purple-400 m-1 flex items-center">
          <div className="p-1 bg-stone-800 flex space-x-1 flex-1">
            <Tab active={activeTab === Tabs.Home} onClick={() => setActiveTab(Tabs.Home)}>
              Home
            </Tab>
            <Tab active={activeTab === Tabs.Research} onClick={() => setActiveTab(Tabs.Research)}>
              Research
            </Tab>
            <Tab
              active={activeTab === Tabs.Structures}
              onClick={() => setActiveTab(Tabs.Structures)}
            >
              Structures
            </Tab>
            <Tab active={activeTab === Tabs.Debug} onClick={() => setActiveTab(Tabs.Debug)}>
              Debug
            </Tab>
          </div>
          <div className="justify-self-end text-white mr-1">
            {/* @ts-ignore */}
            Mark: <span className="bg-purple-400 text-sm py-0.5 px-0.5">{state.mark}</span>
            <span className="text-purple-400"> | </span> Common:{' '}
            <span className="bg-orange-500 text-sm py-0.5 px-0.5">{state.ore.common}</span>
            <span className="text-purple-400"> | </span> Rare:{' '}
            <span className="bg-yellow-500 text-sm py-0.5 px-0.5">{state.ore.rare}</span>
            <span className="text-purple-400"> | </span> Moral:{' '}
            <span className="bg-blue-400 text-sm py-0.5 px-0.5">{state.morale}</span>
          </div>
        </div>
        <div className="border border-purple-400 m-1 p-1 text-white">
          {activeTab === Tabs.Home && <HomePanel />}
          {activeTab === Tabs.Research && <ResearchPanel />}
          {activeTab === Tabs.Structures && <StructuresPanel />}
          {activeTab === Tabs.Debug && <DebugPanel />}
        </div>
      </div>
    </div>
  );
}

export default App;
