import { createDraft, produce } from 'immer';
import { expect, test } from 'vitest';
import { structureSpec } from '../../data/structures';
import { BuildingStatus, BuildingTypes } from '../../types';
import { createNewStructure } from '../../utils';
import { initialState } from '../initialState';
import { cancelProduceStructure } from './cancelProduceStructure';

test('stops producing and returns prorated ore', () => {
  const previousState = produce(initialState, (draft) => {
    draft.ore.common = 5000;
    draft.buildings.push({
      ...createNewStructure(structureSpec.FactoryStructure, BuildingStatus.Online),
      current: { type: BuildingTypes.Agridome, progress: 100 },
    });
  });

  const newState = createDraft(previousState);

  cancelProduceStructure(newState, {
    payload: { factory: previousState.buildings[0] },
    type: 'game/cancelProduceStructure',
  });

  expect(newState.buildings[0].current).toBeUndefined();
  expect(newState.ore.common).toEqual(5112);
});
