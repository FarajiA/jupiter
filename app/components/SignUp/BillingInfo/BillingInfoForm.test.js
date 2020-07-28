import React from 'react';
import enzyme from 'enzyme';
import { BillingInfoForm } from './BillingInfoForm';
import { mountWithForm } from '../../../../test/provider';
import { SubmissionError } from 'redux-form';
const { t } = global;

describe('BillingInfoForm', () => {
  const submitMock = jest.fn();
  const mockCheckAddress = jest.fn();
  const pushMock = jest.fn();
  const setAddressMock = jest.fn();
  const getCountryMock = jest.fn();
  const defaultProps = {
    customerType: 'rackspace',
    country: 'US',
    handleSubmit: submitMock,
    setAddress: setAddressMock,
    checkAddress: mockCheckAddress,
    getCountry: getCountryMock,
    history: {
      push: pushMock
    },
    t
  };

  const shallow = (props) => {
    return enzyme.shallow(<BillingInfoForm {...defaultProps} {...props} />);
  };

  const mounted = (props) => {
    return mountWithForm(BillingInfoForm, {
      defaultProps,
      props,
      withRouter: true
    });
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('calls setAddress and clearProduct if customerType is rbu', () => {
    const wrapper = mounted({ customerType: 'rbu' });
    wrapper.update();
    expect(setAddressMock).toHaveBeenNthCalledWith(
      1, 'street', 'Toranomon Hills Mori Tower 7th Floor Toranomon 1-23-1'
    );
  });

  it('calls setAddress with empty params if customerType is not rbu', () => {
    const wrapper = mounted({ customerType: 'aws' });
    wrapper.update();
    expect(setAddressMock).toHaveBeenNthCalledWith(1, 'street', '');
  });

  it('calls getCountry with the param JP if customerType is rbu', () => {
    mounted({ customerType: 'rbu' });
    expect(getCountryMock).toHaveBeenCalledWith('JP');
  });

  test('it passes correct props to AddressSection and CurrencySelector', () => {
    const wrapper = shallow();
    const addressProps = wrapper.find('AddressSection').props();
    expect(addressProps.customerType).toEqual(defaultProps.customerType);
  });

  test('back button navigates to address page onClick', () => {
    const push = jest.fn();
    const wrapper = shallow({ history: { push } });
    wrapper.find('Button').first().simulate('click');
    expect(push).toBeCalledWith('/');
  });

  test('next button navigates to address page onClick', () => {
    const push = jest.fn();
    const wrapper = shallow({ history: { push } });
    wrapper.find('form').simulate('submit', { bubbles: true });
    expect(submitMock).toBeCalled();
  });

  test('submitAddressValidation navigates to user details pageif the validation is successful', () => {
    jest.useFakeTimers();
    const props = {
      addressValidation: {
        pending: false,
        valid: true
      }
    };
    const values = {
      billingInfo: {
        address: {
          zipcode: '78218-2179',
          country: 'US',
          city: 'San Antonio',
          street: '1 Fanatical Pl',
          state: 'Texas',
          statecode: 'TX'
        }
      }
    };
    const wrapper = mounted(props);
    /* eslint-disable jest/valid-expect-in-promise */
    wrapper.find(BillingInfoForm).instance().submitAddressValidation(values).then((data) => {
      expect(pushMock).toHaveBeenCalledWith('/user-detail');
    });
    expect(mockCheckAddress).toHaveBeenCalled();
    jest.runAllTimers();
  });

  test('submitAddressValidation returns SubmissionError if the validation fails', async () => {
    jest.useFakeTimers();
    const props = {
      addressValidation: {
        pending: false,
        valid: false,
        errorMsg: [
          {
            name: 'zipcode',
            description: 'Field must be present'
          },
          {
            name: 'state',
            description: 'Texas is not a state in the UK.'
          }
        ]
      }
    };
    const values = {
      billingInfo: {
        address: {
          zipcode: '78218-2179',
          country: 'US',
          city: 'San Antonio',
          street: '1 Fanatical Pl',
          state: 'Texas',
          statecode: 'TX'
        }
      }
    };
    const wrapper = mounted(props);
    /* eslint-disable jest/valid-expect */
    expect(wrapper.find(BillingInfoForm).instance().submitAddressValidation(values))
      .rejects.toBeInstanceOf(SubmissionError);
    expect(mockCheckAddress).toHaveBeenCalled();
    jest.runAllTimers();
  });
});
