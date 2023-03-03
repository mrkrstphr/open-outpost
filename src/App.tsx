import { useEffect, useState } from 'react';
import { Content } from './components/Content';
import { Tab } from './components/Tab';
import _edenResearchTree from './eden-research-tree.json';
import useThunkReducer from './hooks';
import { gameReducer, startResearch } from './reducer';
import type { GameState, ResearchItem } from './types';
import { filterAvailableResearch } from './utils';

const edenResearchTree = _edenResearchTree as ResearchItem[];

const initialState: GameState = {
  mark: 0,
  currentResearchTopic: undefined,
  finishedResearch: [],
  gameLog: [],
};

enum Tabs {
  Home,
  Research,
  Structures,
  Debug,
}

function HomePanel({ state }: { state: GameState }) {
  return <Content title="Home">Hello, World.</Content>;
}

function ResearchPanel({
  state,
  onStartResearch,
}: {
  state: GameState;
  onStartResearch: (topic: ResearchItem) => void;
}) {
  const [selectedTopic, setSelectedTopic] = useState<ResearchItem | undefined>();

  useEffect(() => {
    if (selectedTopic && state.finishedResearch.includes(selectedTopic.topic)) {
      setSelectedTopic(undefined);
    }
  }, [selectedTopic, state.finishedResearch]);

  const standardLabTopics = filterAvailableResearch(
    'Standard',
    edenResearchTree,
    state.finishedResearch
  );
  const advancedLabTopics = filterAvailableResearch(
    'Advanced',
    edenResearchTree,
    state.finishedResearch
  );

  const availableTopics = [
    ...standardLabTopics,
    ...(state.finishedResearch.includes('Research Training Programs') ? advancedLabTopics : []),
  ];

  return (
    <Content title="Research">
      <div>
        Currently Researching:{' '}
        {state.currentResearchTopic ? (
          <span>
            {state.currentResearchTopic.topic}: {state.currentResearchTopic.counter}
          </span>
        ) : (
          'Nothing'
        )}
        .
      </div>

      {state.currentResearchTopic && (
        <div className="h-4 my-1 p-1 border border-purple-500">
          <div
            className="bg-purple-500 h-full"
            style={{
              width: `${Math.min(
                (state.currentResearchTopic.counter / state.currentResearchTopic.cost) * 100,
                100
              )}%`,
            }}
          ></div>
        </div>
      )}

      <div className="flex w-full space-x-1">
        <div className="flex-1 border border-purple-400 p-1">
          <div className="font-medium mb-1">Available Research Topics</div>
          <ul className="ml-12 list-decimal">
            {availableTopics.map((topic) => (
              <li
                className="mb-0.5 hover:underline cursor-pointer hover:text-purple-400"
                onClick={() => setSelectedTopic(topic)}
              >
                {topic.topic}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1 border border-purple-400 p-1">
          {selectedTopic && (
            <>
              <h3 className="font-semibold mb-1">{selectedTopic.topic}</h3>
              <div className="mb-2">
                Scientists: {selectedTopic.scientists}, Cost: {selectedTopic.cost}
              </div>
              <div className="mb-2">{selectedTopic.teaser}</div>
              <div className="mb-2">{selectedTopic.description}</div>
              <div className="mb-2">{selectedTopic.result}</div>

              {!state.currentResearchTopic && (
                <div className="mt-1 text-center">
                  <button
                    type="button"
                    className="bg-green-400 text-white py-0.5 px-1 hover:bg-green-500"
                    onClick={() => onStartResearch(selectedTopic)}
                  >
                    Start Research
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Content>
  );
}

function DebugPanel({ state }: { state: GameState }) {
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
  const [activeTab, setActiveTab] = useState(0);
  const [state, dispatch] = useThunkReducer(gameReducer, initialState);

  useEffect(() => {
    const interval = setInterval(() => dispatch({ type: 'tick' }), 20000);

    return () => clearInterval(interval);
  }, [dispatch]);

  const setResearchTopic = (topic: ResearchItem) => dispatch(startResearch(topic));

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
            <span className="text-purple-400"> | </span> Moral:{' '}
            <span className="bg-yellow-400 text-sm py-0.5 px-0.5">??</span>
          </div>
        </div>
        <div className="border border-purple-400 m-1 p-1 text-white">
          {activeTab === Tabs.Home && <HomePanel state={state} />}
          {activeTab === Tabs.Research && (
            <ResearchPanel state={state} onStartResearch={setResearchTopic} />
          )}
          {activeTab === Tabs.Structures && <Content title="Structures">Hello, Buildings.</Content>}
          {activeTab === Tabs.Debug && <DebugPanel state={state} />}
        </div>
      </div>
    </div>
  );
}

export default App;
