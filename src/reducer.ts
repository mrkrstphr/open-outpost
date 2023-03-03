import { GameState, ResearchItem } from './types';

type Action =
  | { type: 'tick' }
  | { type: 'startResearch'; topic: ResearchItem }
  | { type: 'updateResearchCounter'; counter: number }
  | { type: 'finishResearch' };

export const startResearch =
  (topic: ResearchItem) => (dispatch: React.Dispatch<Action>, state: GameState) => {
    dispatch({ type: 'startResearch', topic });

    let counter = 0;

    const interval = setInterval(() => {
      console.log('updating?');

      counter = counter + 1;

      dispatch({ type: 'updateResearchCounter', counter });

      // console.log('current counter', state.currentResearchTopic?.counter);
      // console.log('current cost', state.currentResearchTopic?.cost);

      if (counter >= topic.cost) {
        dispatch({ type: 'finishResearch' });
        clearInterval(interval);
      }

      // if (
      //   (state.currentResearchTopic?.counter ?? 0) + 1 >=
      //   (state.currentResearchTopic?.cost ?? 0)
      // ) {
      //   console.log('finishing!!');
      //   dispatch({ type: 'finishResearch' });
      //   clearInterval(interval);
      // }
    }, 25);
  };

export function gameReducer(state: GameState, action: Action) {
  switch (action.type) {
    case 'startResearch':
      return {
        ...state,
        currentResearchTopic: { ...action.topic, counter: 0 },
        gameLog: [...state.gameLog, `Started researching: ${action.topic.topic}`],
      };

    case 'updateResearchCounter':
      //   // return {
      //   //   ...state,
      //   //   currentResearchTopic: { ...state.currentResearchTopic, counter: action.counter },
      //   // };

      // console.log(state);
      // console.log(action)

      if (!state.currentResearchTopic) {
        return state;
      }

      return {
        ...state,
        currentResearchTopic: { ...state.currentResearchTopic, counter: action.counter },
      };
    case 'finishResearch':
      if (!state.currentResearchTopic) {
        return state;
      }

      return {
        ...state,
        currentResearchTopic: undefined,
        finishedResearch: [...state.finishedResearch, state.currentResearchTopic.topic],
        gameLog: [...state.gameLog, `Finished researching: ${state.currentResearchTopic.topic}`],
      };

    case 'tick':
      // TODO: check research?..

      return {
        ...state,
        mark: state.mark + 1,
      };
  }

  return state;
}
