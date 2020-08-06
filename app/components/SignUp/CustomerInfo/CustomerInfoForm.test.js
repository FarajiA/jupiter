import React from 'react';
import { mountWithForm } from '../../../../test/provider';
import { t } from '../../../../test/i18n/mocks';
import { CustomerInfoForm } from './CustomerInfoForm';
import enzyme from 'enzyme';

describe('CustomerInfoForm', () => {
  const setAddressMock = jest.fn();
  const clearProductMock = jest.fn();
  const clearChannelMock = jest.fn();
  const submitMock = jest.fn();
  const mockUpdateChannel = jest.fn();
  const getCountryMock = jest.fn();
  const defaultProps = {
    handleSubmit: submitMock,
    customerType: '',
    productType: '',
    updateChannel: mockUpdateChannel,
    setAddress: setAddressMock,
    clearProduct: clearProductMock,
    getCountry: getCountryMock,
    clearChannel: clearChannelMock,
    t
  };

  const mounted = (props) => {
    return mountWithForm(CustomerInfoForm, {
      defaultProps,
      props,
      withRouter: true
    });
  };

  const shallow = (props) => {
    return enzyme.shallow(<CustomerInfoForm {...defaultProps} {...props} />);
  };

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('calls setAddress and clearProduct if customerType is rbu', () => {
    const wrapper = mounted();
    const event = {
      target: {
        value: 'rbu'
      }
    };
    wrapper.find('CustomerType').props().handleCustomerTypeChange(event);
    expect(getCountryMock).toHaveBeenCalledWith('JP');
    expect(setAddressMock).toHaveBeenNthCalledWith(
      1, 'street', 'Toranomon Hills Mori Tower 7th Floor Toranomon 1-23-1'
    );
  });

  it('calls setAddress with empty params if customerType was changed from rbu', () => {
    const wrapper = shallow({ customerType: 'rbu' });
    wrapper.find('CustomerType').find('select');
    wrapper.setProps({ customerType: 'aws' });
    wrapper.update();
    expect(setAddressMock).toHaveBeenNthCalledWith(1, 'street', '');
  });

  it('it calls clearProductMock on change', () => {
    const wrapper = mounted();
    const event = {
      target: {
        value: 'aws'
      }
    };
    wrapper.find('CustomerType').props().handleCustomerTypeChange(event);
    wrapper.update();
    expect(clearProductMock).toHaveBeenCalledTimes(1);
  });

  test('next button navigates to address page onClick', () => {
    const push = jest.fn();
    const wrapper = shallow({ history: { push } });
    wrapper.find('Submit').simulate('click');
    expect(submitMock).toHaveBeenCalled();
  });

  test('Transaction type option is not rendered if product type is not managed_vmc', () => {
    const wrapper = shallow();
    expect(wrapper.find('ChannelType').length).toBe(0);
  });

  test('clearChannel is invoked upon changing the product type from managed_vmc to something else', () => {
    const props = {
      ...defaultProps,
      productType: 'managed_vmc',
      channelType: 'AWS',
      handleChange: jest.fn()
    };
    const wrapper = mountWithForm(CustomerInfoForm, { props });
    const event = {
      target: {
        value: ''
      }
    };
    wrapper.find('Product').props().clearChannelType(event);
    wrapper.update();
    expect(props.clearChannel).toBeCalledTimes(1);
  });

  test('handleChannelUpdate is invoked upon changing the channel type', () => {
    const props = {
      ...defaultProps,
      productType: 'managed_vmc',
      handleChange: jest.fn()
    };
    const wrapper = mountWithForm(CustomerInfoForm, { props });
    const event = {
      target: {
        value: ''
      }
    };
    wrapper.find('ChannelType').props().handleChannelUpdate(event);
    wrapper.update();
    expect(props.updateChannel).toBeCalledTimes(1);
  });
});
