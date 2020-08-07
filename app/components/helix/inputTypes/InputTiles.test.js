import React from 'react';
import renderer from 'react-test-renderer';
import InputTiles from './InputTiles';
import { t } from '../../../../test/i18n/mocks';


describe('InputTiles', () => {
  let wrapper;
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
    size: 'hxMd',
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

  beforeEach(() => {
    wrapper = shallow(<InputTiles {...defaultProps} />);
  });

  test('it renders with appropriate props', () => {
    const component = renderer.create(<InputTiles {...defaultProps} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('it renders multiple options based on options prop', () => {
    const options = wrapper.find('ChoiceTile');
    expect(options.length).toEqual(2);
  });

  test('it renders the disclaimer', () => {
    const options = wrapper.find('#tiles-desc').find('p');
    expect(options.text()).toEqual('tiles-disclaimer');
  });
});
