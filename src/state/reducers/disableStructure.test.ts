import { createDraft } from 'immer';
import { expect, test, vi } from 'vitest';
import { structureSpec } from '../../data/structures';
import { StructureStatus, StructureTypes, type Structure } from '../../types';
import { createNewStructure } from '../../utils';
import { createGameState } from '../initialState';
import { disableStructure } from './disableStructure';

test('should not allow disabling unknown structure', () => {
  const consoleMock = vi.spyOn(console, 'info');

  const previousState = createGameState({
    structures: [createNewStructure(structureSpec[StructureTypes.LabStandard], StructureStatus.Online)],
  });
  const newState = createDraft(previousState);

  disableStructure(newState, {
    payload: {
      structure: { id: '101' } as Structure,
    },
    type: 'game/disableStructure',
  });

  expect(consoleMock).toHaveBeenCalledWith('Could not find specified structure to disable');
});

test('should disable the structure', () => {
  const previousState = createGameState({
    structures: [createNewStructure(structureSpec[StructureTypes.LabStandard], StructureStatus.Online)],
  });
  const newState = createDraft(previousState);

  disableStructure(newState, {
    payload: {
      structure: newState.structures[0],
    },
    type: 'game/disableStructure',
  });

  expect(newState.structures[0].status).toEqual(StructureStatus.Offline);
});
