// This is used for all redux states to return to the original state upon submission
export const RESET_STATE = 'RESET_STATE';

export function resetReduxState() {
  return (dispatch) => {
    dispatch({
      type: RESET_STATE
    });
  };
}
