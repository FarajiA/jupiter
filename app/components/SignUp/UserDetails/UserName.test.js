import React from 'react';
import { t } from '../../../../test/i18n/mocks';
import UserNameForm, { UserName } from './UserName';
import { mountWithForm, renderWithForm } from '../../../../test/provider';

describe('UserName', () => {
  let mounted;
  const checkIfExistsMock = jest.fn();
  const setUsernameMock = jest.fn();
  const defaultProps = {
    checkIfExists: checkIfExistsMock,
    username: 'first.last.123',
    exists: false,
    error: false,
    loading: false,
    success: false,
    hxClassNames: '',
    setUsername: setUsernameMock,
    syncErrors: {
      userInfo: {
        username: ['Required']
      }
    },
    t
  };

  afterEach(() => {
    checkIfExistsMock.mockRestore();
  });

  test('it renders', () => {
    const rendered = renderWithForm(UserNameForm, defaultProps).toJSON();
    expect(rendered).toMatchSnapshot();
  });

  test('setUsername to be called on props update', () => {
    const wrapper = shallow(<UserName {...defaultProps} />);
    wrapper.setProps({ username: 'new_username' });
    expect(wrapper.instance().props.setUsername).toHaveBeenCalled();
  });

  test('it renders the tooltip', () => {
    mounted = mountWithForm(UserNameForm, { ...defaultProps });
    expect(mounted.find('hx-tooltip').text()).toEqual(
      'If your first name or last name is changed, a new username will be automatically generated for you.'
    );
  });

  test('it does not render the suffix if it does not exist', () => {
    mounted = mountWithForm(UserNameForm, { ...defaultProps });
    expect(mounted.find('hxSuffix').length).toBeFalsy();
  });

  test('it renders the loading suffix loading prop is true', () => {
    const wrapper = shallow(<UserName {...defaultProps} loading />);
    expect(wrapper.find('hx-busy').length).toBeTruthy();
  });

  test('it renders the exclamation suffix if exists prop is true', () => {
    const wrapper = shallow(<UserName {...defaultProps} exists />);
    expect(wrapper.find('hx-icon[class="exclamation"]').length).toBeTruthy();
  });

  test('it renders the checkmark suffix if success prop is true', () => {
    const props = {
      success: true,
      syncErrors: {
        userInfo: {}
      }
    };
    const wrapper = shallow(<UserName {...defaultProps} {...props} />);
    expect(wrapper.find('hx-icon[class="checkmark"]').length).toBeTruthy();
  });

  test('it does not render a suffix if the username does not exist', () => {
    const props = {
      username: ''
    };
    const wrapper = shallow(<UserName {...defaultProps} {...props} />);
    expect(wrapper.find('hx-icon').length).toBeFalsy();
  });
});
