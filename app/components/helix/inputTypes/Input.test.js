import tr from 'i18next-icu/locale-data/tr';
import React from 'react';
import renderer from 'react-test-renderer';
import Input from './Input';

describe('Input', () => {
  const defaultProps = {
    input: {
      name: 'name'
    },
    label: 'First Name',
    type: 'text',
    meta: {
      touched: false,
      invalid: false,
      error: 'Errors Ahoy!'
    }
  };
  test('it renders with correct props', () => {
    const component = renderer.create(<Input {...defaultProps} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('it does not show error if it has not been touched', () => {
    const wrapper = shallow(<Input {...defaultProps} />);
    expect(wrapper.find('hx-error').length).toBe(0);
  });

  test('it shows appropriate error when field has been touched', () => {
    const props = {
      input: {
        name: 'name'
      },
      label: 'First Name',
      type: 'text',
      meta: {
        touched: true,
        error: ['Errors Ahoy!']
      }
    };
    const wrapper = shallow(<Input {...props} />);
    expect(wrapper.find('Error').length).toBe(1);
    expect(wrapper.find('Error').dive().text()).toEqual('Errors Ahoy!');
  });
  test('it sets hxInvalid class when field is touched & invalid', () => {
    const props = {
      input: {
        name: ''
      },
      label: 'First Name',
      type: 'text',
      meta: {
        touched: true,
        invalid: true
      }
    };
    const wrapper = shallow(<Input {...props} />);
    expect(wrapper.find('Error').length).toBe(1);
    expect(wrapper.find('hx-text-control').prop('class').includes('hxInvalid')).toBeTruthy();
  });
});
