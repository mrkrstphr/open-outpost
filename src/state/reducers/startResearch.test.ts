import { createDraft } from 'immer';
import { expect, test, vi } from 'vitest';
import { structureSpec } from '../../data/structures';
import { StructureStatus, StructureTypes, type ResearchItem } from '../../types';
import { createNewStructure } from '../../utils';
import { createGameState } from '../initialState';
import { startResearch } from './startResearch';

test('should not allow starting research at an unknown lab', () => {
  const consoleMock = vi.spyOn(console, 'info');

  const previousState = createGameState({
    colonists: { workers: 10, scientists: 20 },
    structures: [createNewStructure(structureSpec[StructureTypes.LabStandard], StructureStatus.Online)],
  });
  const newState = createDraft(previousState);

  const topic = { lab: 'Standard', scientists: 5 } as ResearchItem;

  startResearch(newState, {
    payload: {
      lab: { ...previousState.structures[0], id: 'unknown-lab-id' },
      topic,
      scientists: 5,
    },
    type: 'game/startResearch',
  });

  expect(consoleMock).toHaveBeenCalledWith('Could not find specified lab');
});

test('should not allow the wrong lab to do the research', () => {
  const consoleMock = vi.spyOn(console, 'info');

  const previousState = createGameState({
    structures: [createNewStructure(structureSpec[StructureTypes.LabStandard], StructureStatus.Online)],
  });
  const newState = createDraft(previousState);

  const topic = { lab: 'Advanced', scientists: 5 } as ResearchItem;

  startResearch(newState, {
    payload: {
      lab: previousState.structures[0],
      topic,
      scientists: 5,
    },
    type: 'game/startResearch',
  });

  expect(consoleMock).toHaveBeenCalledWith('Lab cannot perform this research');
});

test('should not allow assigning more scientists than available', () => {
  const consoleMock = vi.spyOn(console, 'info');

  const previousState = createGameState({
    colonists: { workers: 10, scientists: 2 },
    structures: [createNewStructure(structureSpec[StructureTypes.LabStandard], StructureStatus.Online)],
  });
  const newState = createDraft(previousState);

  const topic = { lab: 'Standard', scientists: 5 } as ResearchItem;

  startResearch(newState, {
    payload: {
      lab: previousState.structures[0],
      topic,
      scientists: 5,
    },
    type: 'game/startResearch',
  });

  expect(consoleMock).toHaveBeenCalledWith('Not enough scientists to make research assignment');
});

test('should not allow assigning more scientists than allowed', () => {
  const consoleMock = vi.spyOn(console, 'info');

  const previousState = createGameState({
    colonists: { workers: 10, scientists: 20 },
    structures: [createNewStructure(structureSpec[StructureTypes.LabStandard], StructureStatus.Online)],
  });
  const newState = createDraft(previousState);

  const topic = { lab: 'Standard', scientists: 5 } as ResearchItem;

  startResearch(newState, {
    payload: {
      lab: previousState.structures[0],
      topic,
      scientists: 11,
    },
    type: 'game/startResearch',
  });

  expect(consoleMock).toHaveBeenCalledWith('Too many scientists assigned to this research topic');
});

test('should start the research assignment', () => {
  const previousState = createGameState({
    colonists: { workers: 10, scientists: 20 },
    structures: [createNewStructure(structureSpec[StructureTypes.LabStandard], StructureStatus.Online)],
  });
  const newState = createDraft(previousState);

  const topic = { lab: 'Standard', scientists: 5 } as ResearchItem;

  startResearch(newState, {
    payload: {
      lab: previousState.structures[0],
      topic,
      scientists: 5,
    },
    type: 'game/startResearch',
  });

  expect(newState.structures[0].researchTopic).toEqual({ ...topic, progress: 0, startMark: 0, assignedScientists: 5 });
});
