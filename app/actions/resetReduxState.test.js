import * as actions from './resetReduxState';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('actions/resetReduxState', () => {
  let store;
  beforeEach(() => {
    store = mockStore();
  });

  afterEach(async () => {
    jest.restoreAllMocks();
  });

  test('it should create an action to succeed', () => {
    const expectedAction = {
      type: actions.RESET_STATE
    };
    store.dispatch(actions.resetReduxState());
    expect(store.getActions()).toEqual([expectedAction]);
  });
});
