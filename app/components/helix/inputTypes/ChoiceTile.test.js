import React from 'react';
import renderer from 'react-test-renderer';
import ChoiceTile from './ChoiceTile';
import enzyme from 'enzyme';
import { t } from '../../../../test/i18n/mocks';
import { SIZES } from '../constants';


describe('ChoiceTile', () => {
  const mockHandleChannelUpdate = jest.fn();
  const defaultProps = {
    item: {
      label: 'option-1',
      subheader: 'First Choice SubHeader',
      description: 'First Choice Description',
      value: 'value_1'
    },
    handleUpdate: mockHandleChannelUpdate,
    disabled: true,
    icon: '',
    invalid: false,
    subdued: false,
    label: 'Tiles Label',
    id: 'tiles-id',
    name: 'channelType',
    size: 'medium',
    selectedValue: '',
    t
  };

  const shallow = (props) => {
    return enzyme.shallow(<ChoiceTile {...defaultProps} {...props} />);
  };

  test('it renders with appropriate props', () => {
    const component = renderer.create(<ChoiceTile {...defaultProps} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('a icon is rendered if passed as a prop', () => {
    const props = { icon: 'bell' };
    const wrapper = shallow(props);
    expect(wrapper.find('hx-icon').length).toEqual(2);
    expect(wrapper.find('hx-icon').at(1).props().type).toEqual(props.icon);
  });

  test('tile is not selected if the passed selected value is different than the current one', () => {
    const props = { selectedValue: 'value_2' };
    const wrapper = shallow(props);
    expect(wrapper.find('input').props().checked).toBeFalsy();
  });

  test('tile is selected if the passed selected value is same as the current one', () => {
    const props = { selectedValue: 'value_1' };
    const wrapper = shallow(props);
    expect(wrapper.find('hx-tile').props().class).toEqual(SIZES[defaultProps.size]);
    expect(wrapper.find('input').props().checked).toBeTruthy();
  });

  test('handleUpdate is invoked upon selecting any value', () => {
    const wrapper = shallow();
    expect(mockHandleChannelUpdate).toHaveBeenCalledTimes(0);
    const event = {
      target: {
        value: 'value_1'
      }
    };
    wrapper.find('input').simulate('change', event);
    wrapper.update();
    expect(mockHandleChannelUpdate).toHaveBeenCalled();
  });
});
