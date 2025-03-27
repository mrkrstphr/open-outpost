import type { PayloadAction } from '@reduxjs/toolkit';
import { structureSpec } from '../../data/structures';
import type { ResearchItem, Structure } from '../../types';
import { calculateAvailableScientists } from '../../utils';
import type { GameState } from '../slices/game';

export const startResearch = (
  state: GameState,
  action: PayloadAction<{ lab: Structure; topic: ResearchItem; scientists: number }>
) => {
  const { lab, scientists, topic } = action.payload;
  const labDefinition = structureSpec[lab.type];

  const labStructure = state.structures.find(({ id }) => id === lab.id);

  if (!labStructure) {
    console.info('Could not find specified lab');
    return;
  }

  if (topic.lab !== labDefinition.researchType) {
    console.info('Lab cannot perform this research');
    return;
  }

  const availableScientists = calculateAvailableScientists(state);

  if (scientists > availableScientists) {
    console.info('Not enough scientists to make research assignment');
    return;
  }

  if (scientists > topic.scientists) {
    console.info('Too many scientists assigned to this research topic');
    return;
  }

  labStructure.researchTopic = {
    ...topic,
    progress: 0,
    assignedScientists: scientists,
    startMark: state.mark,
  };
};
