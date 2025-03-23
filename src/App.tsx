import { produce } from 'immer';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Content } from './components/Content';
import { Tab } from './components/Tab';
import ResearchPanel from './panels/Research';
import { StructuresPanel } from './panels/Structures';
import { AppDispatch, RootState, tick, updateBuildingProgress } from './store';
import {
  BuildingStatus,
  BuildingType,
  CommandCenter,
  FactoryStructure,
  LabStandard,
} from './types';

function updateConstructionState(dispatch: AppDispatch, structure: BuildingType) {
  if (structure?.status === BuildingStatus.Building) {
    if (structure.health + 1 >= structure.maxHealth) {
      dispatch(
        updateBuildingProgress({
          id: structure.id,
          status: BuildingStatus.Online,
          health: structure.maxHealth,
        })
      );
    } else {
      dispatch(
        updateBuildingProgress({
          id: structure.id,
          status: BuildingStatus.Building,
          health: structure.maxHealth,
        })
      );
    }
  }

  return structure;
}

function agridomeHandler(mark: number, dispatch: AppDispatch, agridome: BuildingType) {
  const newState = updateConstructionState(dispatch, agridome);

  return newState;
}

function standardLabHandler(mark: number, dispatch: AppDispatch, lab: LabStandard) {
  const newState = updateConstructionState(dispatch, lab);

  return newState;
}

function commandCenterHandler(mark: number, dispatch: AppDispatch, center: CommandCenter) {
  const newState = updateConstructionState(dispatch, center);

  return newState;
}

function factoryStructureHandler(mark: number, dispatch: AppDispatch, factory: FactoryStructure) {
  const newState = updateConstructionState(dispatch, factory);

  return newState;
}

function smelterCommonHandler(mark: number, dispatch: AppDispatch, smelter: BuildingType) {
  const newState = updateConstructionState(dispatch, smelter);

  if (smelter.status === BuildingStatus.Online && smelter.lastMark !== mark) {
    // ?? how to update ore??
  }

  return produce(newState, (draft) => {
    draft.lastMark = mark;
  });
}

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

function getBuildingManager(type: BuildingType['type']) {
  switch (type) {
    case 'Agridome':
      return agridomeHandler;
    case 'CommandCenter':
      return commandCenterHandler;
    case 'LabStandard':
      return standardLabHandler;
    case 'FactoryStructure':
      return factoryStructureHandler;
    case 'SmelterCommon':
      return smelterCommonHandler;
  }
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

    const interval = setInterval(() => {
      dispatch(tick());
      structures.forEach((structure) => {
        const buildingManager = getBuildingManager(structure.type);
        if (buildingManager) {
          // @ts-ignore TODO: FIXME: typing???
          buildingManager(state.mark, dispatch, structure);
        }
      });
    }, tickInterval);

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
            <span className="bg-blue-400 text-sm py-0.5 px-0.5">??</span>
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
