import { GET_COUNTRY_PENDING, GET_COUNTRY_SUCCESS, GET_COUNTRY_FAILURE } from '../actions/address/getCountry';
import { RESET_STATE } from '../actions/resetReduxState';

export const INITIAL_STATE = {
  details: {},
  pending: false,
  success: false,
  error: false
};

export default function checkCountriesReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_COUNTRY_PENDING:
      return {
        ...state,
        pending: true,
        success: false
      };
    case GET_COUNTRY_SUCCESS:
      return {
        ...state,
        details: action.country,
        pending: false,
        success: true
      };
    case GET_COUNTRY_FAILURE:
      return {
        ...state,
        success: false,
        error: action.error
      };
    case RESET_STATE:
      return INITIAL_STATE;
    default:
      return state;
  }
}
