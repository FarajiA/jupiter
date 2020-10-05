import { UPDATE_STEPS } from '../actions/stepsUpdate';

export const INITIAL_STATE = {
  completed_steps: 0
};

export default function stepsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPDATE_STEPS:
      return {
        ...state,
        completed_steps: action.step
      };
    default:
      return state;
  }
}
