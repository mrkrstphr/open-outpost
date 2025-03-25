import type { PayloadAction } from '@reduxjs/toolkit';
import type { GameState } from '../slices/game';

export const publishNotice = (state: GameState, action: PayloadAction<{ message: string }>) => {
  const { message } = action.payload;

  state.notices.push({ message, mark: state.mark });
};
