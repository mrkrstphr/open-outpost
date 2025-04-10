import type { PayloadAction } from '@reduxjs/toolkit';
import { structureSpec } from '../../data/structures';
import { type Structure, StructureTypes } from '../../types';
import { canBuildStructure } from '../../utils';
import type { GameState } from '../slices/game';

export const produceStructure = (
  state: GameState,
  action: PayloadAction<{ factory: Structure; type: StructureTypes }>
) => {
  const { factory, type } = action.payload;
  const factoryDefinition = structureSpec[factory.type];
  const definition = structureSpec[type];

  if (factory.current?.type) {
    console.info('Factory is busy building another structure');
    return;
  }

  if ((factory.storage?.length ?? 0) >= (factoryDefinition.produces?.slots ?? 0)) {
    console.info('Factory storage is full');
    return;
  }

  if (!canBuildStructure(state.ore, definition)) {
    console.info('Not enough ore to create structure');
    return;
  }

  state.structures = state.structures.map((structure) => {
    if (structure.id === factory.id) {
      return { ...structure, current: { type, progress: 0 } };
    }

    return structure;
  });

  state.ore.common -= definition.buildCost.common ?? 0;
  state.ore.rare -= definition.buildCost.rare ?? 0;
};
