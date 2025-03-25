import { createDraft, produce } from 'immer';
import { expect, test, vi } from 'vitest';
import { structureSpec } from '../../data/structures';
import { StructureStatus, StructureTypes } from '../../types';
import { createNewStructure } from '../../utils';
import { initialState } from '../initialState';
import { produceStructure } from './produceStructure';

test('starts producing the new structure when all conditions are met', () => {
  const previousState = produce(initialState, (draft) => {
    draft.ore.common = 5000;
    draft.structures.push(createNewStructure(structureSpec.FactoryStructure, StructureStatus.Online));
  });

  const newState = createDraft(previousState);

  produceStructure(newState, {
    payload: { factory: previousState.structures[0], type: StructureTypes.Agridome },
    type: 'game/produceStructure',
  });

  expect(newState).toEqual(
    produce(previousState, (draft) => {
      draft.ore.common = draft.ore.common - (structureSpec.Agridome.buildCost.common ?? 0);
      draft.structures[0].current = { type: StructureTypes.Agridome, progress: 0 };
    })
  );
});

test('without enough ore, does not start producing the new structure', () => {
  const consoleMock = vi.spyOn(console, 'info');

  const previousState = produce(initialState, (draft) => {
    draft.ore.common = 100;
    draft.structures.push(createNewStructure(structureSpec.FactoryStructure, StructureStatus.Online));
  });

  const newState = createDraft(previousState);

  produceStructure(newState, {
    payload: { factory: previousState.structures[0], type: StructureTypes.Agridome },
    type: 'game/produceStructure',
  });

  expect(newState).toEqual(previousState);
  expect(consoleMock).toHaveBeenCalledWith('Not enough ore to create structure');
});

test('does not start producing if the factory is busy', () => {
  const consoleMock = vi.spyOn(console, 'info');

  const previousState = produce(initialState, (draft) => {
    draft.ore.common = 5000;
    draft.structures.push(createNewStructure(structureSpec.FactoryStructure, StructureStatus.Online));
    draft.structures[0].current = { type: StructureTypes.Agridome, progress: 0 };
  });

  const newState = createDraft(previousState);

  produceStructure(newState, {
    payload: { factory: previousState.structures[0], type: StructureTypes.LabStandard },
    type: 'game/produceStructure',
  });

  expect(newState).toEqual(previousState);
  expect(consoleMock).toHaveBeenCalledWith('Factory is busy building another structure');
});

test('does not start producing if the factory storage is full', () => {
  const consoleMock = vi.spyOn(console, 'info');

  const previousState = produce(initialState, (draft) => {
    draft.ore.common = 5000;
    draft.structures.push(createNewStructure(structureSpec.FactoryStructure, StructureStatus.Online));
    draft.structures[0].storage = [
      StructureTypes.Agridome,
      StructureTypes.LabStandard,
      StructureTypes.SmelterCommon,
      StructureTypes.CommandCenter,
      StructureTypes.FactoryStructure,
      StructureTypes.Agridome,
    ];
  });

  const newState = createDraft(previousState);

  produceStructure(newState, {
    payload: { factory: previousState.structures[0], type: StructureTypes.LabStandard },
    type: 'game/produceStructure',
  });

  expect(newState).toEqual(previousState);
  expect(consoleMock).toHaveBeenCalledWith('Factory storage is full');
});
