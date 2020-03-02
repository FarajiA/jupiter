import checkUsernameReducer, { INITIAL_STATE } from './checkUsernameReducer';
import { CHECK_USERNAME_PENDING, CHECK_USERNAME_SUCCESS, CHECK_USERNAME_FAILURE } from '../actions/checkUsername';

describe('reducers/checkUsernameReducer', () => {
  test('it should return the initial state', () => {
    expect(checkUsernameReducer(undefined, {})).toEqual(INITIAL_STATE);
  });

  test('it should handle CHECK_USERNAME_PENDING', () => {
    expect(
      checkUsernameReducer([], {
        type: CHECK_USERNAME_PENDING
      })
    ).toEqual({
      pending: true,
      success: false
    });
  });

  test('it should handle CHECK_USERNAME_SUCCESS', () => {
    expect(
      checkUsernameReducer([], {
        type: CHECK_USERNAME_SUCCESS,
        username: 'john.doe.1234',
        exists: false
      })
    ).toEqual({
      exists: false,
      success: true,
      pending: false,
      username: 'john.doe.1234'
    });
  });

  test('it should handle CHECK_USERNAME_FAILURE', () => {
    expect(
      checkUsernameReducer([], {
        type: CHECK_USERNAME_FAILURE,
        error: 'oh noes!'
      })
    ).toEqual({
      error: 'oh noes!',
      success: false
    });
  });
});
