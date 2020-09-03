import validateAddressReducer, { INITIAL_STATE } from './validateAddressReducer';
import {
  POST_ADDRESS_PENDING,
  VALIDATE_ADDRESS_SUCCESS,
  VALIDATE_ADDRESS_FAILURE,
  POST_ADDRESS_FAILURE
} from '../actions/address/validateAddress';
import { RESET_STATE } from '../actions/resetReduxState';

describe('reducers/validateAddressReducer', () => {
  test('it should return the initial state', () => {
    expect(validateAddressReducer(undefined, {})).toEqual(INITIAL_STATE);
  });
  test('it should handle POST_ADDRESS_PENDING', () => {
    expect(
      validateAddressReducer([], {
        type: POST_ADDRESS_PENDING
      })
    ).toEqual(
      {
        pending: true,
        valid: false
      }
    );
  });
  test('it should handle VALIDATE_ADDRESS_SUCCESS', () => {
    const addressDetails = {
      zipcode: '80000',
      country: 'US',
      city: 'San Francisco',
      street: '1 Fanatical Pl',
      state: 'Texas'
    };
    expect(
      validateAddressReducer([], {
        type: VALIDATE_ADDRESS_SUCCESS,
        valid: true,
        address: { addressDetails }
      })
    ).toEqual(
      {
        pending: false,
        success: true,
        address: { addressDetails },
        valid: true
      }
    );
  });
  test('it should handle VALIDATE_ADDRESS_FAILURE', () => {
    const error = {
      errorField: [
        {
          name: 'zipcode',
          description: 'Field must be present'
        }
      ],
      outcome: 'INVALID'
    };
    expect(
      validateAddressReducer([], {
        type: VALIDATE_ADDRESS_FAILURE,
        error: { error },
        valid: false
      })
    ).toEqual(
      {
        pending: false,
        valid: false,
        errorMsg: { error }
      }
    );
  });
  test('it should handle POST_ADDRESS_FAILURE', () => {
    const error = {
      error: 'post request failed'
    };
    expect(
      validateAddressReducer([], {
        type: POST_ADDRESS_FAILURE,
        error: { error },
        valid: false
      })
    ).toEqual(
      {
        pending: false,
        valid: false,
        errorMsg: { error }
      }
    );
  });

  test('it should handle RESET_STATE', () => {
    expect(
      validateAddressReducer([], {
        type: RESET_STATE
      })
    ).toEqual(INITIAL_STATE);
  });
});
