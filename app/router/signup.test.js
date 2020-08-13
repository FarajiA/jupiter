import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { App } from '../containers/App';
import { t } from '../../test/i18n/mocks';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';
import { Provider } from 'react-redux';
import { CustomerInfoForm } from '../components/SignUp/CustomerInfo/CustomerInfoForm';
import { BillingInfoForm } from '../components/SignUp/BillingInfo/BillingInfoForm';
import { UserInfoForm } from '../components/SignUp/UserDetails/UserInfoForm';
jest.mock('axios');

const store = createStore(rootReducer, applyMiddleware(thunk));

describe('routes/signup', () => {
  const roles = {
    pending: false,
    success: true,
    authorized: true
  };
  const mounted = (route) => {
    return mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>
          <App t={t} roles={roles} />
        </MemoryRouter>
      </Provider>
    );
  };

  it('initial path / routes to Product', () => {
    const wrapper = mounted('/');
    expect(wrapper.find(CustomerInfoForm)).toHaveLength(1);
    expect(wrapper.find(BillingInfoForm)).toHaveLength(0);
    expect(wrapper.find(UserInfoForm)).toHaveLength(0);
  });

  it('path /billing routes to Address', () => {
    const wrapper = mounted('/billing');
    expect(wrapper.find(CustomerInfoForm)).toHaveLength(0);
    expect(wrapper.find(BillingInfoForm)).toHaveLength(1);
    expect(wrapper.find(UserInfoForm)).toHaveLength(0);
  });

  it('path /user-detail routes to UserInfo', () => {
    const wrapper = mounted('/user-detail');
    expect(wrapper.find(CustomerInfoForm)).toHaveLength(0);
    expect(wrapper.find(BillingInfoForm)).toHaveLength(0);
    expect(wrapper.find(UserInfoForm)).toHaveLength(1);
  });
});
