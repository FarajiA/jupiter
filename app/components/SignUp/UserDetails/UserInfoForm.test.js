import React from 'react';
import { t } from '../../../../test/i18n/mocks';
import enzyme from 'enzyme';
import { mountWithForm } from '../../../../test/provider';
import { UserInfoForm } from './UserInfoForm';

describe('UserInfoForm', () => {
  const submitMock = jest.fn();
  const signupMock = jest.fn();
  const pushMock = jest.fn();
  const resetReduxStateMock = jest.fn();
  const defaultProps = {
    customerType: 'rackspace',
    handleSubmit: submitMock,
    signUp: signupMock,
    pending: false,
    success: true,
    result: true,
    resetReduxState: resetReduxStateMock,
    history: {
      push: pushMock
    },
    t
  };
  const mounted = (props) => {
    return mountWithForm(UserInfoForm, {
      defaultProps,
      props,
      withRouter: true
    });
  };

  const shallow = (props) => {
    return enzyme.shallow(<UserInfoForm {...defaultProps} {...props} />);
  };

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('back button navigates to address page onClick', () => {
    const wrapper = shallow();
    wrapper.find('Button').simulate('click');
    expect(pushMock).toBeCalledWith('/billing');
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

  test('closeModal calls resetReduxState if success is true', () => {
    const wrapper = mounted().find('SubmissionModal');
    wrapper.props().hideModal();
    expect(resetReduxStateMock).toHaveBeenCalled();
  });

  test('closeModal does not call resetReduxState if success is false', () => {
    const wrapper = mounted({ success: false }).find('SubmissionModal');
    wrapper.props().hideModal();
    expect(resetReduxStateMock).toHaveBeenCalledTimes(0);
  });

  test('close modal navigates page to "/"', () => {
    const wrapper = mounted().find('SubmissionModal');
    wrapper.props().hideModal();
    expect(pushMock).toHaveBeenCalledWith('/');
  });

  test('SubmissionModal is rendered if result is present', () => {
    const modal = mounted().find('.submission-modal');
    expect(modal).toHaveLength(1);
  });

  test('SubmissionModal is not rendered if result is false', () => {
    const modal = mounted({ result: false }).find('.submission-modal');
    expect(modal).toHaveLength(0);
  });
});
