import { PayloadAction } from '@reduxjs/toolkit';
import { structureSpec } from '../../data/structures';
import { Building } from '../../types';
import { createNewStructure } from '../../utils';
import { GameState } from '../slices/game';

export const buildStructure = (
  state: GameState,
  action: PayloadAction<{ factory: Building; index: number }>
) => {
  const { factory, index } = action.payload;
  const structureToBuild = factory.storage?.[index];

  if (!structureToBuild) {
    console.info('No structure found in storage at index');
    return;
  }

  const structure = structureSpec[structureToBuild];

  state.buildings.push(createNewStructure(structure));

  state.buildings = state.buildings.map((building) => {
    if (building.id === factory.id) {
      return { ...building, storage: factory.storage?.filter((_, i) => i !== index) };
    }

    return building;
  });
};
