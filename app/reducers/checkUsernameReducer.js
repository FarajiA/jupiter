import {
  CHECK_USERNAME_FAILURE,
  CHECK_USERNAME_SUCCESS,
  CHECK_USERNAME_PENDING
} from '../actions/userInfo/checkUsername';
import { RESET_STATE } from '../actions/resetReduxState';

export const INITIAL_STATE = {
  username: '',
  pending: false,
  exists: false,
  success: false,
  error: false
};

export default function checkUsernameReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHECK_USERNAME_PENDING:
      return {
        ...state,
        pending: true,
        success: false
      };
    case CHECK_USERNAME_SUCCESS:
      return {
        ...state,
        pending: false,
        success: true,
        exists: action.exists,
        username: action.username
      };
    case CHECK_USERNAME_FAILURE:
      return {
        ...state,
        success: false,
        username: action.username,
        error: action.error
      };
    case RESET_STATE:
      return INITIAL_STATE;
    default:
      return state;
  }
}
