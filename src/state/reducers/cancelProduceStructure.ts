import type { PayloadAction } from '@reduxjs/toolkit';
import { structureSpec } from '../../data/structures';
import type { Structure } from '../../types';
import type { GameState } from '../slices/game';

export const cancelProduceStructure = (state: GameState, action: PayloadAction<{ factory: Structure }>) => {
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

  state.structures = state.structures.map((structure) => {
    if (structure.id === factory.id) {
      return { ...structure, current: undefined };
    }

    return structure;
  });

  state.ore.common += refund.common;
  state.ore.rare += refund.rare;
};
