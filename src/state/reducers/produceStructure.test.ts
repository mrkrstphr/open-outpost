import { createDraft, produce } from 'immer';
import { expect, test, vi } from 'vitest';
import { structureSpec } from '../../data/structures';
import { BuildingStatus } from '../../types';
import { createNewStructure } from '../../utils';
import { initialState } from '../initialState';
import { produceStructure } from './produceStructure';

test('starts producing the new structure when all conditions are met', () => {
  const previousState = produce(initialState, (draft) => {
    draft.ore.common = 5000;
    draft.buildings.push(
      createNewStructure(0, 0, structureSpec.FactoryStructure, BuildingStatus.Online)
    );
  });

  const newState = createDraft(previousState);

  produceStructure(newState, {
    payload: { factory: previousState.buildings[0], type: 'Agridome' },
  });

  expect(newState).toEqual(
    produce(previousState, (draft) => {
      draft.ore.common = draft.ore.common - structureSpec.Agridome.buildCost.common;
      draft.buildings[0].current = { type: 'Agridome', progress: 0 };
    })
  );
});

test('without enough ore, does not start producing the new structure', () => {
  const consoleMock = vi.spyOn(console, 'info');

  const previousState = produce(initialState, (draft) => {
    draft.ore.common = 100;
    draft.buildings.push(
      createNewStructure(0, 0, structureSpec.FactoryStructure, BuildingStatus.Online)
    );
  });

  const newState = createDraft(previousState);

  produceStructure(newState, {
    payload: { factory: previousState.buildings[0], type: 'Agridome' },
  });

  expect(newState).toEqual(previousState);
  expect(consoleMock).toHaveBeenCalledWith('Not enough ore to create structure');
});

test('does not start producing if the factory is busy', () => {
  const consoleMock = vi.spyOn(console, 'info');

  const previousState = produce(initialState, (draft) => {
    draft.ore.common = 5000;
    draft.buildings.push(
      createNewStructure(0, 0, structureSpec.FactoryStructure, BuildingStatus.Online)
    );
    draft.buildings[0].current = { type: 'Agridome', progress: 0 };
  });

  const newState = createDraft(previousState);

  produceStructure(newState, {
    payload: { factory: previousState.buildings[0], type: 'LabStandard' },
  });

  expect(newState).toEqual(previousState);
  expect(consoleMock).toHaveBeenCalledWith('Factory is busy building another structure');
});

test('does not start producing if the factory storage is full', () => {
  const consoleMock = vi.spyOn(console, 'info');

  const previousState = produce(initialState, (draft) => {
    draft.ore.common = 5000;
    draft.buildings.push(
      createNewStructure(0, 0, structureSpec.FactoryStructure, BuildingStatus.Online)
    );
    draft.buildings[0].storage = [
      'Agridome',
      'LabStandard',
      'SmelterCommon',
      'CommandCenter',
      'FactoryStructure',
      'Agridome',
    ];
  });

  const newState = createDraft(previousState);

  produceStructure(newState, {
    payload: { factory: previousState.buildings[0], type: 'LabStandard' },
  });

  expect(newState).toEqual(previousState);
  expect(consoleMock).toHaveBeenCalledWith('Factory storage is full');
});
