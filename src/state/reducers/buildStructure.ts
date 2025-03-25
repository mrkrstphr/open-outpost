import type { PayloadAction } from '@reduxjs/toolkit';
import { structureSpec } from '../../data/structures';
import type { Structure } from '../../types';
import { createNewStructure } from '../../utils';
import type { GameState } from '../slices/game';

export const buildStructure = (state: GameState, action: PayloadAction<{ factory: Structure; index: number }>) => {
  const { factory, index } = action.payload;
  const structureToBuild = factory.storage?.[index];

  if (!structureToBuild) {
    console.info('No structure found in storage at index');
    return;
  }

  const structureDef = structureSpec[structureToBuild];

  state.structures.push(createNewStructure(structureDef));

  state.structures = state.structures.map((structure) => {
    if (structure.id === factory.id) {
      return { ...structure, storage: factory.storage?.filter((_, i) => i !== index) };
    }

    return structure;
  });
};
