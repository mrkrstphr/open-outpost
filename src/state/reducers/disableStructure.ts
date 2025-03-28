import type { PayloadAction } from '@reduxjs/toolkit';
import { StructureStatus, type Structure } from '../../types';
import type { GameState } from '../slices/game';

export const disableStructure = (state: GameState, action: PayloadAction<{ structure: Structure }>) => {
  const { structure } = action.payload;

  const theStructure = state.structures.find(({ id }) => id === structure.id);

  if (!theStructure) {
    console.info('Could not find specified structure to disable');
    return;
  }

  theStructure.status = StructureStatus.Offline;
};
