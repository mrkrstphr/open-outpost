import { createDraft, produce } from 'immer';
import { expect, test, vi } from 'vitest';
import { structureSpec } from '../../data/structures';
import { BuildingStatus, BuildingTypes } from '../../types';
import { createNewStructure } from '../../utils';
import { initialState } from '../initialState';
import { produceStructure } from './produceStructure';

test('starts producing the new structure when all conditions are met', () => {
  const previousState = produce(initialState, (draft) => {
    draft.ore.common = 5000;
    draft.buildings.push(createNewStructure(structureSpec.FactoryStructure, BuildingStatus.Online));
  });

  const newState = createDraft(previousState);

  produceStructure(newState, {
    payload: { factory: previousState.buildings[0], type: BuildingTypes.Agridome },
  });

  expect(newState).toEqual(
    produce(previousState, (draft) => {
      draft.ore.common = draft.ore.common - (structureSpec.Agridome.buildCost.common ?? 0);
      draft.buildings[0].current = { type: BuildingTypes.Agridome, progress: 0 };
    })
  );
});

test('without enough ore, does not start producing the new structure', () => {
  const consoleMock = vi.spyOn(console, 'info');

  const previousState = produce(initialState, (draft) => {
    draft.ore.common = 100;
    draft.buildings.push(createNewStructure(structureSpec.FactoryStructure, BuildingStatus.Online));
  });

  const newState = createDraft(previousState);

  produceStructure(newState, {
    payload: { factory: previousState.buildings[0], type: BuildingTypes.Agridome },
  });

  expect(newState).toEqual(previousState);
  expect(consoleMock).toHaveBeenCalledWith('Not enough ore to create structure');
});

test('does not start producing if the factory is busy', () => {
  const consoleMock = vi.spyOn(console, 'info');

  const previousState = produce(initialState, (draft) => {
    draft.ore.common = 5000;
    draft.buildings.push(createNewStructure(structureSpec.FactoryStructure, BuildingStatus.Online));
    draft.buildings[0].current = { type: BuildingTypes.Agridome, progress: 0 };
  });

  const newState = createDraft(previousState);

  produceStructure(newState, {
    payload: { factory: previousState.buildings[0], type: BuildingTypes.LabStandard },
  });

  expect(newState).toEqual(previousState);
  expect(consoleMock).toHaveBeenCalledWith('Factory is busy building another structure');
});

test('does not start producing if the factory storage is full', () => {
  const consoleMock = vi.spyOn(console, 'info');

  const previousState = produce(initialState, (draft) => {
    draft.ore.common = 5000;
    draft.buildings.push(createNewStructure(structureSpec.FactoryStructure, BuildingStatus.Online));
    draft.buildings[0].storage = [
      BuildingTypes.Agridome,
      BuildingTypes.LabStandard,
      BuildingTypes.SmelterCommon,
      BuildingTypes.CommandCenter,
      BuildingTypes.FactoryStructure,
      BuildingTypes.Agridome,
    ];
  });

  const newState = createDraft(previousState);

  produceStructure(newState, {
    payload: { factory: previousState.buildings[0], type: BuildingTypes.LabStandard },
  });

  expect(newState).toEqual(previousState);
  expect(consoleMock).toHaveBeenCalledWith('Factory storage is full');
});
