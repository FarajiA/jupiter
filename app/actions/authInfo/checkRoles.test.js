import mockAxios from 'axios';
import * as actions from './checkRoles';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('actions/checkRoles', () => {
  test('it should create an action for success', () => {
    const expectedAction = {
      type: actions.CHECK_ROLES_SUCCESS,
      authorized: true
    };
    expect(actions.checkRolesSuccess(true)).toEqual(expectedAction);
  });
});

describe('async checkRoles action', () => {
  let store;
  beforeEach(() => {
    store = mockStore();
  });

  afterEach(async () => {
    jest.restoreAllMocks();
  });

  test('it should create an action for success with authorized flag as false, when axios call fails with code 403',
    async () => {
      const error = { response: { status: 403, data: { message: 'oh noes!' } } };
      mockAxios.post.mockImplementationOnce(() => Promise.reject(error));
      const expectedActions = [
        {
          type: actions.CHECK_ROLES_SUCCESS,
          authorized: false
        }
      ];
      await store.dispatch(actions.checkUserRoles());
      expect(store.getActions()).toEqual(expectedActions);
      expect(mockAxios.post).toHaveBeenCalled();
    });

  test('it should create an action for success with authorized flag as false, when axios call fails with code 400',
    async () => {
      const error = { response: { status: 400, data: { message: 'oh noes!' } } };
      mockAxios.post.mockImplementationOnce(() => Promise.reject(error));
      const expectedActions = [
        {
          type: actions.CHECK_ROLES_SUCCESS,
          authorized: true
        }
      ];
      await store.dispatch(actions.checkUserRoles());
      expect(store.getActions()).toEqual(expectedActions);
      expect(mockAxios.post).toHaveBeenCalled();
    });
});
