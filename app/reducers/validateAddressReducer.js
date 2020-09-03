import {
  POST_ADDRESS_PENDING,
  VALIDATE_ADDRESS_SUCCESS,
  VALIDATE_ADDRESS_FAILURE,
  POST_ADDRESS_FAILURE
} from '../actions/address/validateAddress';
import { RESET_STATE } from '../actions/resetReduxState';

export const INITIAL_STATE = {
  pending: false,
  success: true,
  valid: false,
  errorMsg: []
};

export default function validateAddressReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case POST_ADDRESS_PENDING:
      return {
        ...state,
        pending: true,
        valid: false
      };
    case VALIDATE_ADDRESS_SUCCESS:
      return {
        ...state,
        pending: false,
        success: true,
        address: action.address,
        valid: action.valid
      };
    case VALIDATE_ADDRESS_FAILURE:
      return {
        pending: false,
        valid: action.valid,
        errorMsg: action.error
      };
    case POST_ADDRESS_FAILURE:
      return {
        pending: false,
        valid: action.valid,
        errorMsg: action.error
      };
    case RESET_STATE:
      return INITIAL_STATE;
    default:
      return state;
  }
}
