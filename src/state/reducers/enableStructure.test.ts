import { createDraft } from 'immer';
import { expect, test, vi } from 'vitest';
import { structureSpec } from '../../data/structures';
import { StructureStatus, StructureTypes, type Structure } from '../../types';
import { createNewStructure } from '../../utils';
import { createGameState } from '../initialState';
import { enableStructure } from './enableStructure';

test('should not allow enabling unknown structure', () => {
  const consoleMock = vi.spyOn(console, 'info');

  const previousState = createGameState({
    structures: [createNewStructure(structureSpec[StructureTypes.LabStandard], StructureStatus.Online)],
  });
  const newState = createDraft(previousState);

  enableStructure(newState, {
    payload: {
      structure: { id: '101' } as Structure,
    },
    type: 'game/enableStructure',
  });

  expect(consoleMock).toHaveBeenCalledWith('Could not find specified structure to disable');
});

test('should not allow enabling structures if not enough power', () => {
  const consoleMock = vi.spyOn(console, 'info');

  const previousState = createGameState({
    structures: [createNewStructure(structureSpec[StructureTypes.LabStandard], StructureStatus.Offline)],
  });
  const newState = createDraft(previousState);

  enableStructure(newState, {
    payload: {
      structure: newState.structures[0],
    },
    type: 'game/enableStructure',
  });

  expect(newState.structures[0].status).toEqual(StructureStatus.Offline);

  expect(consoleMock).toHaveBeenCalledWith('Not enough power to enable structure');
});

test('should not allow enabling structures if not enough workers', () => {
  const consoleMock = vi.spyOn(console, 'info');

  const previousState = createGameState({
    structures: [
      createNewStructure(structureSpec[StructureTypes.Tokamak], StructureStatus.Online),
      createNewStructure(structureSpec[StructureTypes.LabStandard], StructureStatus.Offline),
    ],
  });
  const newState = createDraft(previousState);

  enableStructure(newState, {
    payload: {
      structure: newState.structures[1],
    },
    type: 'game/enableStructure',
  });

  expect(newState.structures[1].status).toEqual(StructureStatus.Offline);

  expect(consoleMock).toHaveBeenCalledWith('Not enough staff to enable structure');
});

test('should enable the structure if all conditions are met', () => {
  const previousState = createGameState({
    structures: [
      createNewStructure(structureSpec[StructureTypes.Tokamak], StructureStatus.Online),
      createNewStructure(structureSpec[StructureTypes.LabStandard], StructureStatus.Offline),
    ],
    colonists: { workers: 2 },
  });
  const newState = createDraft(previousState);

  enableStructure(newState, {
    payload: {
      structure: newState.structures[1],
    },
    type: 'game/enableStructure',
  });

  expect(newState.structures[1].status).toEqual(StructureStatus.Online);
});
