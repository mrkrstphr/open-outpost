import { PayloadAction } from '@reduxjs/toolkit';
import { structureSpec } from '../../data/structures';
import { Building, ResearchItem } from '../../types';
import { GameState } from '../slices/game';

export const startResearch = (
  state: GameState,
  action: PayloadAction<{ lab: Building; topic: ResearchItem; scientists: number }>
) => {
  const { lab, scientists, topic } = action.payload;
  const labDefinition = structureSpec[lab.type];

  if (topic.lab !== labDefinition.researchType) {
    console.info('Lab cannot perform this research');
    return;
  }

  state.buildings = state.buildings.map((building) => {
    if (building.id === lab.id) {
      return {
        ...building,
        researchTopic: {
          ...topic,
          progress: 0,
          assignedScientists: scientists,
          startMark: state.mark,
        },
      };
    }

    return building;
  });
};
