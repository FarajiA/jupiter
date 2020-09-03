import listCountriesReducer, { INITIAL_STATE } from './listCountriesReducer';
import { GET_COUNTRIES_PENDING, GET_COUNTRIES_SUCCESS, GET_COUNTRIES_FAILURE } from '../actions/address/listCountries';
import { RESET_STATE } from '../actions/resetReduxState';

describe('reducers/checkUsernameReducer', () => {
  test('it should return the initial state', () => {
    expect(listCountriesReducer(undefined, {})).toEqual(INITIAL_STATE);
  });

  test('it should handle CHECK_USERNAME_PENDING', () => {
    expect(
      listCountriesReducer([], {
        type: GET_COUNTRIES_PENDING
      })
    ).toEqual({
      pending: true,
      success: false
    });
  });

  test('it should handle CHECK_USERNAME_SUCCESS', () => {
    expect(
      listCountriesReducer([], {
        type: GET_COUNTRIES_SUCCESS,
        countryList: { 'US': { code: 'test' } },
        countryCodes: ['US']
      })
    ).toEqual({
      countries: {
        'US': { code: 'test' }
      },
      countryCodes: ['US'],
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
      listCountriesReducer([], {
        type: GET_COUNTRIES_FAILURE,
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
      listCountriesReducer([], {
        type: RESET_STATE
      })
    ).toEqual(INITIAL_STATE);
  });
});
