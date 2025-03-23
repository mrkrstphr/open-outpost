import { produce } from 'immer';
import { useEffect, useState } from 'react';
import { Content } from './components/Content';
import { Tab } from './components/Tab';
import ResearchPanel from './panels/Research';
import { StructuresPanel } from './panels/Structures';
import {
  BuildingStatus,
  BuildingType,
  CommandCenter,
  FactoryStructure,
  LabStandard,
  type GameState,
  type ResearchItem,
} from './types';
import {
  createCommandCenter,
  createSmelterCommon,
  createStandardLab,
  createStructureFactory,
} from './utils';

// Agridome:
//   Plymouth:
//     Build Cost: 225
//     HP: 1000
//     Power: 20
//     Workers: 1
//     Scientists: 0
//     Production: 36
// Standard Lab:
//   Plymouth:
//     Build Cost: 950
//     HP: 1250
//     Power: 50
//     Workers: 1
//     Scientists: 0
// Command Center:
//   Plymouth:
//     Build Cost: ???
//     HP: 2500
//     Power: 0
//     Workers: 4
//     Scientists: 1
// Residence:
//   Plymouth:
//     Build Cost: 225
// Smelter, Common Ore:
//   Plymouth:
//     Build Cost:
//     HP: 2000
// Tokamak Reactor:
//   Plymouth:
//     Build Cost:
//     HP: 1500
//     Production: 250

function updateConstructionState(structure: BuildingType) {
  if (structure?.status === BuildingStatus.Building) {
    if (structure.health + 1 >= structure.maxHealth) {
      return { ...structure, status: BuildingStatus.Online, health: structure.maxHealth };
    } else {
      return { ...structure, health: structure.health + 1 };
    }
  }

  return structure;
}

function agridomeHandler(mark: number, agridome: BuildingType) {
  const newState = updateConstructionState(agridome);

  return newState;
}

function standardLabHandler(mark: number, lab: LabStandard) {
  const newState = updateConstructionState(lab);

  return newState;
}

function commandCenterHandler(mark: number, center: CommandCenter) {
  const newState = updateConstructionState(center);

  return newState;
}

function factoryStructureHandler(mark: number, factory: FactoryStructure) {
  const newState = updateConstructionState(factory);

  return newState;
}

function smelterCommonHandler(mark: number, smelter: BuildingType) {
  const newState = updateConstructionState(smelter);

  if (smelter.status === BuildingStatus.Online && smelter.lastMark !== mark) {
    // ?? how to update ore??
  }

  return produce(newState, (draft) => {
    draft.lastMark = mark;
  });
}

const initialState: GameState = {
  tick: 0,
  mark: 0,
  buildings: [],
  currentResearchTopic: undefined,
  finishedResearch: [],
  gameLog: [],
  ore: {
    rare: 0,
    common: 0,
  },
};

function createGameState({
  buildings,
  ore,
}: {
  buildings?: Array<BuildingType>;
  ore?: { common?: number; rare?: number };
}) {
  return {
    ...initialState,
    buildings: buildings ? buildings : [],
    ore: {
      ...initialState.ore,
      ...ore,
    },
  };
}

enum Tabs {
  Home,
  Research,
  Structures,
  Debug,
}

function HomePanel({ state }: { state: GameState }) {
  return <Content title="Home">Hello, World.</Content>;
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

function calculateTickAndMark(currentState: GameState): GameState {
  return produce(currentState, (draft) => {
    if ((draft.tick + 1) % 100 === 0) {
      draft.tick = 0;
      draft.mark = draft.mark + 1;
    } else {
      draft.tick += 1;
    }
  });
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

function updateGameState(currentState: GameState): GameState {
  let newState = calculateTickAndMark(currentState);

  newState = produce(newState, (draft) => {
    draft.buildings = draft.buildings.map((building) => {
      const buildingManager = getBuildingManager(building.type);
      if (buildingManager) {
        // @ts-ignore TODO: FIXME: typing???
        return buildingManager(draft.mark, building);
      }

      console.error(`No building manager found for type: ${building.type}`);
      return building;
    });
  });

  return newState;
}

function App() {
  const [gameState, setGameState] = useState<GameState>(
    createGameState({
      buildings: [
        createCommandCenter(10, 10, BuildingStatus.Online),
        createSmelterCommon(20, 20, BuildingStatus.Online),
        createStructureFactory(15, 15, BuildingStatus.Online),
        createStandardLab(0, 0),
      ],
      ore: { common: 4000 },
    })
  );

  const [activeTab, setActiveTab] = useState(0);

  const settings = {
    gameSpeed: 5,
  };

  useEffect(() => {
    const tickInterval = 1000 / (settings.gameSpeed * 4);

    const interval = setInterval(
      () => setGameState((currentState) => updateGameState(currentState)),
      tickInterval
    );

    return () => clearInterval(interval);
  }, [settings.gameSpeed]);

  const setResearchTopic = (topic: ResearchItem) => console.log(`TODO: research ${topic.topic}`);

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
            Mark: <span className="bg-purple-400 text-sm py-0.5 px-0.5">{gameState.mark}</span>
            <span className="text-purple-400"> | </span> Common:{' '}
            <span className="bg-orange-500 text-sm py-0.5 px-0.5">{gameState.ore.common}</span>
            <span className="text-purple-400"> | </span> Rare:{' '}
            <span className="bg-yellow-500 text-sm py-0.5 px-0.5">{gameState.ore.rare}</span>
            <span className="text-purple-400"> | </span> Moral:{' '}
            <span className="bg-blue-400 text-sm py-0.5 px-0.5">??</span>
          </div>
        </div>
        <div className="border border-purple-400 m-1 p-1 text-white">
          {activeTab === Tabs.Home && <HomePanel state={gameState} />}
          {activeTab === Tabs.Research && (
            <ResearchPanel state={gameState} onStartResearch={setResearchTopic} />
          )}
          {activeTab === Tabs.Structures && (
            <StructuresPanel
              state={gameState}
              onCreateStructure={(structure: BuildingType) =>
                setGameState(
                  produce(gameState, (draft) => {
                    if (
                      draft.ore.common < structure.buildCost.common ||
                      draft.ore.rare < structure.buildCost.rare
                    ) {
                      console.error('Not enough ore to build structure');
                      return;
                    }

                    draft.buildings.push(structure);
                    draft.ore.common -= structure.buildCost.common;
                    draft.ore.rare -= structure.buildCost.rare;
                  })
                )
              }
            />
          )}
          {activeTab === Tabs.Debug && <DebugPanel state={gameState} />}
        </div>
      </div>
    </div>
  );
}

export default App;
