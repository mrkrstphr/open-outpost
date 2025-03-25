import { PayloadAction } from '@reduxjs/toolkit';
import { structureSpec } from '../../data/structures';
import { Building, BuildingTypes } from '../../types';
import { canBuildStructure } from '../../utils';
import { GameState } from '../slices/game';

export const produceStructure = (
  state: GameState,
  action: PayloadAction<{ factory: Building; type: BuildingTypes }>
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

  state.buildings = state.buildings.map((building) => {
    if (building.id === factory.id) {
      return { ...building, current: { type, progress: 0 } };
    }

    return building;
  });

  state.ore.common -= definition.buildCost.common ?? 0;
  state.ore.rare -= definition.buildCost.rare ?? 0;
};
