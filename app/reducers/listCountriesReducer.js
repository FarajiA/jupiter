import { GET_COUNTRIES_PENDING, GET_COUNTRIES_SUCCESS, GET_COUNTRIES_FAILURE } from '../actions/address/listCountries';
import { RESET_STATE } from '../actions/resetReduxState';

export const INITIAL_STATE = {
  countries: {},
  countryCodes: [],
  pending: false,
  success: false,
  error: false
};

export default function checkCountriesReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_COUNTRIES_PENDING:
      return {
        ...state,
        pending: true,
        success: false
      };
    case GET_COUNTRIES_SUCCESS:
      return {
        ...state,
        pending: false,
        success: true,
        countries: action.countryList,
        countryCodes: action.countryCodes
      };
    case GET_COUNTRIES_FAILURE:
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
