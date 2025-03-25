import { PayloadAction } from '@reduxjs/toolkit';
import { structureSpec } from '../../data/structures';
import { ResearchItem, Structure } from '../../types';
import { GameState } from '../slices/game';

export const startResearch = (
  state: GameState,
  action: PayloadAction<{ lab: Structure; topic: ResearchItem; scientists: number }>
) => {
  const { lab, scientists, topic } = action.payload;
  const labDefinition = structureSpec[lab.type];

  if (topic.lab !== labDefinition.researchType) {
    console.info('Lab cannot perform this research');
    return;
  }

  state.structures = state.structures.map((structure) => {
    if (structure.id === lab.id) {
      return {
        ...structure,
        researchTopic: {
          ...topic,
          progress: 0,
          assignedScientists: scientists,
          startMark: state.mark,
        },
      };
    }

    return structure;
  });
};
