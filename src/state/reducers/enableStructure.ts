import type { PayloadAction } from '@reduxjs/toolkit';
import { StructureStatus, type Structure } from '../../types';
import { hasEnoughStaffForStructure } from '../../util/colonists';
import { hasEnoughPowerForStructure } from '../../util/power';
import type { GameState } from '../slices/game';

export const enableStructure = (state: GameState, action: PayloadAction<{ structure: Structure }>) => {
  const { structure } = action.payload;

  const theStructure = state.structures.find(({ id }) => id === structure.id);

  if (!theStructure) {
    console.info('Could not find specified structure to disable');
    return;
  }

  if (!hasEnoughPowerForStructure(state, theStructure)) {
    console.info('Not enough power to enable structure');
    return;
  }

  if (!hasEnoughStaffForStructure(state, theStructure)) {
    console.info('Not enough staff to enable structure');
    return;
  }

  theStructure.status = StructureStatus.Online;
};
