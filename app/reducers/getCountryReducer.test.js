import getCountryReducer, { INITIAL_STATE } from './getCountryReducer';
import { GET_COUNTRY_PENDING, GET_COUNTRY_SUCCESS, GET_COUNTRY_FAILURE } from '../actions/address/getCountry';
import { RESET_STATE } from '../actions/resetReduxState';

describe('reducers/checkUsernameReducer', () => {
  test('it should return the initial state', () => {
    expect(getCountryReducer(undefined, {})).toEqual(INITIAL_STATE);
  });

  test('it should handle CHECK_USERNAME_PENDING', () => {
    expect(
      getCountryReducer([], {
        type: GET_COUNTRY_PENDING
      })
    ).toEqual({
      pending: true,
      success: false
    });
  });

  test('it should handle CHECK_USERNAME_SUCCESS', () => {
    const details = {
      countryCode: 'CT',
      code: 'CT',
      name: 'Country',
      states: []
    };
    expect(
      getCountryReducer([], {
        type: GET_COUNTRY_SUCCESS,
        country: { details }
      })
    ).toEqual({
      details: { details },
      pending: false,
      success: true
    });
  });

  test('it should handle CHECK_USERNAME_FAILURE', () => {
    const error = {
      status: 400,
      data: { message: 'oh noes!' }
    };
    expect(
      getCountryReducer([], {
        type: GET_COUNTRY_FAILURE,
        success: false,
        error
      })
    ).toEqual({
      error,
      success: false
    });
  });

  test('it should handle RESET_STATE', () => {
    expect(
      getCountryReducer([], {
        type: RESET_STATE
      })
    ).toEqual(INITIAL_STATE);
  });
});
