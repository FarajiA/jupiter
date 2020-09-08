import React from 'react';
import renderer from 'react-test-renderer';
import * as enzyme from 'enzyme';
import InputTiles from './InputTiles';
import { t } from '../../../../test/i18n/mocks';


describe('InputTiles', () => {
  const mockHandleChannelUpdate = jest.fn();
  const onChangeHandler = jest.fn();
  const mockDisclaimer = <p>tiles-disclaimer</p>;
  const defaultProps = {
    label: 'Tiles Label',
    id: 'tiles-id',
    disclaimer: mockDisclaimer,
    input: {
      name: 'channelType',
      onChange: onChangeHandler
    },
    size: 'medium',
    handleChannelUpdate: mockHandleChannelUpdate,
    selectedValue: '',
    options: [{
      label: 'option-1',
      subheader: 'First Choice SubHeader',
      description: 'First Choice Description',
      value: 'value_1'
    },
    {
      label: 'option-2',
      subheader: 'Second Choice SubHeader',
      description: 'Second Choice Description',
      value: 'value_2'
    }],
    t
  };

  const mount = (props = {}) => enzyme.mount(<InputTiles {...defaultProps} {...props} />);

  test('it renders with appropriate props', () => {
    const component = renderer.create(<InputTiles {...defaultProps} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('it renders multiple options based on options prop', () => {
    const options = mount().find('ChoiceTile');
    expect(options.length).toEqual(2);
  });

  test('it renders the disclaimer', () => {
    const options = mount().find('#tiles-desc').find('p');
    expect(options.text()).toEqual('tiles-disclaimer');
  });

  test('when input value matches option value item is checked', () => {
    const options = mount({ input: { value: 'value_2', onChange: jest.fn(), name: 'foo' } })
      .find('input').map((el) => el.prop('checked'));
    expect(options).toEqual([null, true]);
  });

  test('when input value matches no option value item is not checked', () => {
    const options = mount({ input: { value: 'stuff', onChange: jest.fn(), name: 'foo' } })
      .find('input').map((el) => el.prop('checked'));
    expect(options).toEqual([null, null]);
  });
});
