import mockAxios from 'axios';
import * as actions from './validateRoles';
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
    expect(actions.validateRolesSuccess(true)).toEqual(expectedAction);
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

  test('it should create an action for success with authorized flag as true, when user has a valid role',
    async () => {
      const response = {
        data: { access: { user: { roles: [
          {
            'name': 'signup_service_create_invoice_signup_staging'
          }
        ] } } } };
      mockAxios.get.mockImplementationOnce(() => Promise.resolve(response));
      const expectedActions = [
        {
          type: actions.CHECK_ROLES_SUCCESS,
          authorized: true
        }
      ];
      await store.dispatch(actions.validateUserRoles());
      expect(store.getActions()).toEqual(expectedActions);
      expect(mockAxios.get).toHaveBeenCalled();
    });

  test('it should create an action for success with authorized flag as true, when user does not have a valid role',
    async () => {
      const response = {
        data: { access: { user: { roles: [
          {
            'name': 'racker'
          }
        ] } } } };
      mockAxios.get.mockImplementationOnce(() => Promise.resolve(response));
      const expectedActions = [
        {
          type: actions.CHECK_ROLES_SUCCESS,
          authorized: false
        }
      ];
      await store.dispatch(actions.validateUserRoles());
      expect(store.getActions()).toEqual(expectedActions);
      expect(mockAxios.get).toHaveBeenCalled();
    });

  test('it should create an action for success with authorized flag as false, when axios call fails with code 400',
    async () => {
      const error = { response: { status: 400, data: { message: 'oh noes!' } } };
      mockAxios.get.mockImplementationOnce(() => Promise.reject(error));
      const expectedActions = [
        {
          type: actions.CHECK_ROLES_SUCCESS,
          authorized: false
        }
      ];
      await store.dispatch(actions.validateUserRoles());
      expect(store.getActions()).toEqual(expectedActions);
      expect(mockAxios.get).toHaveBeenCalled();
    });
});
