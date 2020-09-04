import checkRolesReducer, { INITIAL_STATE } from './validateRolesReducer';
import {
  CHECK_ROLES_SUCCESS
} from '../actions/authInfo/validateRoles';

describe('reducers/checkUsernameReducer', () => {
  test('it should return the initial state', () => {
    expect(checkRolesReducer(undefined, {})).toEqual(INITIAL_STATE);
  });

  test('it should handle CHECK_ROLES_SUCCESS', () => {
    expect(
      checkRolesReducer([], {
        type: CHECK_ROLES_SUCCESS,
        authorized: true
      })
    ).toEqual({
      pending: false,
      authorized: true,
      success: true
    });
  });
});
