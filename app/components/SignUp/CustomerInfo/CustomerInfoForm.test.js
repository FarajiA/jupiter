import React from 'react';
import { mountWithForm, mountedForm } from '../../../../test/provider';
import { t } from '../../../../test/i18n/mocks';
import { CustomerInfoForm } from './CustomerInfoForm';
import enzyme from 'enzyme';

describe('CustomerInfoForm', () => {
  const setAddressMock = jest.fn();
  const clearProductMock = jest.fn();
  const clearChannelMock = jest.fn();
  const submitMock = jest.fn();
  const getCountryMock = jest.fn();
  const clearContractEntityMock = jest.fn();
  const defaultProps = {
    handleSubmit: submitMock,
    customerType: '',
    productType: '',
    setAddress: setAddressMock,
    clearProduct: clearProductMock,
    getCountry: getCountryMock,
    clearChannel: clearChannelMock,
    clearContractEntity: clearContractEntityMock,
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

  test('handleCleanChannel is invoked upon changing the product type from managed_vmc to something else', () => {
    const props = {
      ...defaultProps,
      productType: 'managed_vmc',
      handleCleanChannel: jest.fn()
    };
    const wrapper = mountedForm(CustomerInfoForm, { props });
    wrapper.setProps(
      // setProps on children: https://github.com/enzymejs/enzyme/issues/1384
      { children: React.cloneElement(wrapper.props().children, { ...props, productType: '' }) }
    );
    expect(props.clearChannel).toBeCalledTimes(1);
  });

  test('clearContractEntity is invoked upon changing the customer type from onica to something else', () => {
    const props = {
      ...defaultProps,
      customerType: 'onica'
    };
    const wrapper = mountedForm(CustomerInfoForm, { props });
    wrapper.setProps(
      { children: React.cloneElement(wrapper.props().children, { ...props, customerType: 'rbu' }) }
    );
    expect(props.clearContractEntity).toBeCalledTimes(1);
  });
});
