import signUpReducer, { INITIAL_STATE } from './signUpReducer';
import { SUBMIT_FAILURE, SUBMIT_SUCCESS, SUBMIT_PENDING } from '../actions/signUpUser';
import { RESET_STATE } from '../actions/resetReduxState';

describe('reducers/signUpReducer', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('it should return the initial state', () => {
    expect(signUpReducer(undefined, {})).toEqual(INITIAL_STATE);
  });
  test('it should handle SUBMIT_PENDING', () => {
    expect(
      signUpReducer([], {
        type: SUBMIT_PENDING,
        pending: true,
        username: 'bob',
        accountname: 'ing'
      })
    ).toEqual(
      {
        pending: true,
        error: null,
        success: false,
        username: 'bob',
        accountname: 'ing'
      }
    );
  });
  test('it should handle SUBMIT_SUCCESS', () => {
    expect(
      signUpReducer([], {
        type: SUBMIT_SUCCESS,
        ddi: 'test_ddi'
      })
    ).toEqual(
      {
        ddi: 'test_ddi',
        pending: false,
        success: true
      }
    );
  });
  test('it should handle SUBMIT_FAILURE', () => {
    const error = { error: 'test error' };
    expect(
      signUpReducer([], {
        type: SUBMIT_FAILURE,
        error
      })
    ).toEqual(
      {
        pending: false,
        error
      }
    );
  });

  test('it should handle RESET_STATE', () => {
    expect(
      signUpReducer([], {
        type: RESET_STATE
      })
    ).toEqual(INITIAL_STATE);
  });
});
