import { configureStore } from '@reduxjs/toolkit';
import { rememberEnhancer, rememberReducer } from 'redux-remember';
import { gameSlice } from './state/slices/game';

const slicesToRemember = ['game'];

const reducers = {
  game: gameSlice.reducer,
};

const reducer = rememberReducer(reducers);

export const store = configureStore({
  reducer,
  enhancers: (getDefaultEnhancers) =>
    getDefaultEnhancers().concat(rememberEnhancer(window.localStorage, slicesToRemember)),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
