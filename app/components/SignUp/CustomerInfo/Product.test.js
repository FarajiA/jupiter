import React from 'react';
import enzyme from 'enzyme';
import { renderWithForm, mountWithForm } from '../../../../test/provider';
import { t } from '../../../../test/i18n/mocks';
import { Product } from './Product';

describe('Product', () => {
  const defaultProps = {
    customerType: '',
    t
  };

  const shallow = (props) => {
    return enzyme.shallow(<Product {...defaultProps} {...props} />);
  };

  test('it renders', () => {
    const rendered = renderWithForm(Product, { defaultProps }).toJSON();
    expect(rendered).toMatchSnapshot();
  });

  test('dropdown options are disabled if customer type is rbu', () => {
    const { options } = shallow({ customerType: 'rbu' }).props();
    const disabled = options.map((opts) => opts.disabled);
    expect(disabled).toEqual([
      false,
      true,
      true,
      true,
      false
    ]);
  });

  test('dropdown options are disabled if customer type is onica', () => {
    const { options } = shallow({ customerType: 'onica' }).props();
    const disabled = options.map((opts) => opts.disabled);
    expect(disabled).toEqual([
      false,
      true,
      true,
      true,
      true
    ]);
  });

  test('dropdown options are disabled if customer type is not rbu', () => {
    const { options } = shallow({ customerType: 'aws' }).props();
    const disabled = options.map((opts) => opts.disabled);
    expect(disabled).toEqual([
      false,
      false,
      false,
      false,
      false
    ]);
  });

  test('dropdown is disabled if customer type is undefined', () => {
    const wrapperProps = shallow().props();
    expect(wrapperProps.disabled).toBeTruthy();
  });

  test('dropdown is disabled if customer type has a value', () => {
    const wrapperProps = shallow({ customerType: 'aws' }).props();
    expect(wrapperProps.disabled).toBeFalsy();
  });

  test('tooltip prop is rendered', () => {
    const mounted = mountWithForm(Product, { defaultProps });
    expect(mounted.find('hx-tooltip').length).toEqual(1);
    expect(mounted.find('hx-tooltip').text()).toEqual(
      'Currently RBU customers only have access to Managed AWS and Rackspace Private Cloud - VMware'
    );
  });
});
