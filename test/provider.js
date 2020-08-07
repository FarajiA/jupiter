import * as enzyme from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { createStore, applyMiddleware } from 'redux';
import { reduxForm } from 'redux-form';
import renderer from 'react-test-renderer';
import rootReducer from '../app/reducers/rootReducer';
import thunk from 'redux-thunk';


function withForm(Component, { props = {}, defaultProps, method, withRouter = false }) {
  const FormWrapper = reduxForm({ form: 'testForm' })(Component);
  const store = createStore(rootReducer, applyMiddleware(thunk));
  const history = createMemoryHistory();
  const func = method === 'create' ? renderer.create : enzyme[method];
  return func((
    <Provider store={store}>
      {withRouter ? (
        <Router history={history}>
          <FormWrapper {...defaultProps} {...props} />
        </Router>
      ) : (<FormWrapper {...defaultProps} {...props} />)}
    </Provider>
  ));
}

export function renderWithForm(Component, options) {
  return withForm(Component, {
    ...options,
    method: 'create'
  });
}

export function mountedForm(Component, options) {
  return withForm(Component, {
    ...options,
    method: 'mount'
  });
}

/**
 * Note: this only works with SFCs
 * in the case of testing component state you must use mountWithProvider
 * and find the component wrapped in the redux form
 * See AddressSection.test.js for reference
 * */
export function mountWithForm(Component, options) {
  return mountedForm(Component, options).find(Component);
}

export function shallowWithForm(Component, options) {
  return withForm(Component, {
    ...options,
    method: 'shallow'
  });
}
