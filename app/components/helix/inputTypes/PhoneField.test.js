import React from 'react';
import PhoneField from './PhoneField';
import { t } from '../../../../test/i18n/mocks';
import renderer from 'react-test-renderer';

describe('PhoneField', () => {
  const onChangeMock = jest.fn();
  const onBlurMock = jest.fn();
  const defaultProps = {
    input: {
      onChange: onChangeMock,
      onBlur: onBlurMock
    },
    meta: {
      touched: false,
      invalid: false
    },
    name: 'phone',
    label: 'Phone Number',
    country: 'GB', // United Kingdom
    t
  };
  const wrapper = (props) => {
    return shallow(<PhoneField {...defaultProps} {...props} />);
  };

  const mounted = (props) => {
    return mount(<PhoneField {...defaultProps} {...props} />);
  };

  test('PhoneField renders correct props', () => {
    const rendered = renderer.create(<PhoneField {...defaultProps} />).toJSON();
    expect(rendered).toMatchSnapshot();
  });

  test('should render a label', () => {
    expect(wrapper().find('span').text()).toEqual('Phone Number');
  });

  test('it should assign searchPlaceholder', () => {
    const PhoneInput = wrapper().find('.InputField').childAt(1);
    expect(PhoneInput.prop('searchPlaceholder')).toEqual('Search');
    expect(PhoneInput.prop('searchNotFound')).toEqual('No entries to show');
  });

  test('it should assign error-border class if field is touched and invalid', () => {
    const props = {
      meta: {
        touched: true,
        invalid: true
      }
    };
    expect(mounted(props).find('.error-border')).toHaveLength(2);
    expect(mounted(props).find('input').hasClass('error-border')).toBeTruthy();
  });

  test('it should show error if field was touched and error exists', () => {
    const props = {
      meta: {
        touched: true,
        invalid: true,
        error: ['Required']
      }
    };
    expect(mounted(props).find('.error').text()).toEqual('Required');
  });

  test('default country should be country prop', () => {
    expect(mounted().find('div.flag').hasClass('gb')).toBeTruthy();
    expect(mounted({ country: 'US' }).find('div.flag').hasClass('us')).toBeTruthy();
  });

  test('onChange should invoke the onChange with correct parameters', () => {
    const expected = {
      countryCode: '1',
      formattedValue: '+1 (234) 5',
      inputValue: '(234)5',
      number: '+12345',
      valid: false
    };
    wrapper().find('.InputField').childAt(1).props().onChange(
      '12345',
      {
        format: '+....',
        dialCode: '1'
      },
      {
        target: {
          checked: true,
          value: 12345
        }
      },
      '+1 (234) 5'
    );
    expect(onChangeMock).toHaveBeenCalled();
    expect(onChangeMock).toHaveBeenCalledWith(expected);
  });

  test('onBlur should invoke the onBlur prop', () => {
    const expected = {
      countryCode: '1',
      formattedValue: '+1 (234) 5',
      inputValue: '(234)5',
      number: '+12345',
      valid: false
    };
    wrapper().find('.InputField').childAt(1).props().onBlur(
      {
        target: {
          checked: true,
          value: '+1 (234) 5'
        }
      },
      {
        format: '+....',
        dialCode: '1'
      }
    );
    expect(onBlurMock).toHaveBeenCalled();
    expect(onBlurMock).toHaveBeenCalledWith(expected);
  });
});
