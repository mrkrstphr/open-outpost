import { PayloadAction } from '@reduxjs/toolkit';
import { structureSpec } from '../../data/structures';
import { Building } from '../../types';
import { GameState } from '../slices/game';

export const cancelProduceStructure = (
  state: GameState,
  action: PayloadAction<{ factory: Building }>
) => {
  console.log('type', action.type);
  const { factory } = action.payload;

  if (!factory.current?.type) {
    console.info('Factory is not currently building anything');
    return;
  }

  const definition = structureSpec[factory.current?.type];

  const percentageComplete = (factory.current.progress ?? 0) / definition.kitBuildTime;

  const refund = {
    common: Math.floor((definition.buildCost?.common ?? 0) * percentageComplete),
    rare: Math.floor((definition.buildCost?.rare ?? 0) * percentageComplete),
  };

  state.buildings = state.buildings.map((building) => {
    if (building.id === factory.id) {
      return { ...building, current: undefined };
    }

    return building;
  });

  state.ore.common += refund.common;
  state.ore.rare += refund.rare;
};
