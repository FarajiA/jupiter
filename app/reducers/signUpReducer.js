import { SUBMIT_PENDING, SUBMIT_SUCCESS, SUBMIT_FAILURE } from '../actions/signUpUser';
import { RESET_STATE } from '../actions/resetReduxState';

export const INITIAL_STATE = {
  username: null,
  accountname: null,
  pending: false,
  success: false,
  error: null
};

export default function fetchReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SUBMIT_PENDING:
      return {
        ...state,
        username: action.username,
        accountname: action.accountname,
        pending: true,
        success: false,
        error: null
      };
    case SUBMIT_SUCCESS:
      return {
        ...state,
        ddi: action.ddi,
        pending: false,
        success: true
      };
    case SUBMIT_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.error
      };
    case RESET_STATE:
      return INITIAL_STATE;
    default:
      return state;
  }
}
