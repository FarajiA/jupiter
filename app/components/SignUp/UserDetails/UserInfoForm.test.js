import React from 'react';
import { t } from '../../../../test/i18n/mocks';
import enzyme from 'enzyme';
import { mountWithForm } from '../../../../test/provider';
import { UserInfoForm } from './UserInfoForm';

describe('UserInfoForm', () => {
  const submitMock = jest.fn();
  const signupMock = jest.fn();
  const pushMock = jest.fn();
  const defaultProps = {
    customerType: 'rackspace',
    country: 'US',
    handleSubmit: submitMock,
    signUp: signupMock,
    pending: false,
    result: true,
    clearResult: jest.fn(),
    history: {
      push: pushMock
    },
    t
  };
  const mounted = (props) => {
    return mountWithForm(UserInfoForm, { defaultProps, props, withRouter: true });
  };

  const shallow = (props) => {
    return enzyme.shallow(<UserInfoForm {...defaultProps} {...props} />);
  };

  test('back button navigates to address page onClick', () => {
    const push = jest.fn();
    const wrapper = shallow({ history: { push } });
    wrapper.find('Button').simulate('click');
    expect(push).toBeCalledWith('/billing');
  });

  test('submit button is disabled if pending is true', () => {
    const wrapper = shallow({ pending: true }).find('Submit');
    expect(wrapper.prop('disabled')).toBeTruthy();
  });

  test('submit button is not disabled if form is valid and pending is false', () => {
    const wrapper = shallow({ pending: false }).find('Submit');
    expect(wrapper.prop('disabled')).toBeFalsy();
  });

  test('submit button calls signUp prop', () => {
    const wrapper = mounted();
    wrapper.find('form').simulate('submit');
    expect(submitMock).toBeCalled();
  });
});
